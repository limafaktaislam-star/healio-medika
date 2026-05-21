import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AuthTypes "../types/auth";
import WalletTypes "../types/wallet";
import WalletLib "../lib/wallet";

mixin (
  roles : Map.Map<Principal, AuthTypes.UserRole>,
  wallet_balances : Map.Map<Principal, WalletTypes.WalletBalance>,
  wallet_transactions : List.List<WalletTypes.WalletTransaction>,
  wallet_state : { var nextTxId : Nat },
) {

  func isAdmin_(p : Principal) : Bool {
    switch (roles.get(p)) { case (? #admin) true; case _ false };
  };

  public query ({ caller }) func getMyBalance() : async WalletTypes.WalletBalance {
    WalletLib.getBalance(caller, wallet_balances);
  };

  public shared ({ caller }) func deposit(
    amount : Nat,
    method : WalletTypes.DepositMethod,
  ) : async { #ok : WalletTypes.WalletBalance; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    let updated = WalletLib.addBalance(caller, amount, wallet_balances);
    let txId = wallet_state.nextTxId;
    wallet_state.nextTxId += 1;
    WalletLib.recordTransaction({
      id = txId;
      userId = caller;
      transactionType = #deposit;
      amount = amount;
      currency = "IDR";
      description = "Deposit via " # WalletLib.depositMethodToText(method);
      status = #completed;
      createdAt = Time.now();
    }, wallet_transactions);
    #ok(updated);
  };

  public shared ({ caller }) func requestWithdrawal(
    amount : Nat,
    method : WalletTypes.WithdrawalMethod,
    accountNumber : Text,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    switch (WalletLib.deductBalance(caller, amount, wallet_balances)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let txId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txId;
          userId = caller;
          transactionType = #withdrawal;
          amount = amount;
          currency = "IDR";
          description = "Penarikan dana ke " # WalletLib.withdrawalMethodToText(method) # " (" # accountNumber # ")";
          status = #pending;
          createdAt = Time.now();
        }, wallet_transactions);
        #ok("permintaan penarikan dana berhasil diproses");
      };
    };
  };

  public shared ({ caller }) func transferBalance(
    toUserId : Principal,
    amount : Nat,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    if (Principal.equal(caller, toUserId)) { return #err("tidak bisa transfer ke diri sendiri") };
    switch (WalletLib.transfer(caller, toUserId, amount, wallet_balances)) {
      case (#err(e)) { #err(e) };
      case (#ok(msg)) {
        let now = Time.now();
        let txOutId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txOutId;
          userId = caller;
          transactionType = #transfer_out;
          amount = amount;
          currency = "IDR";
          description = "Transfer ke " # toUserId.toText();
          status = #completed;
          createdAt = now;
        }, wallet_transactions);
        let txInId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txInId;
          userId = toUserId;
          transactionType = #transfer_in;
          amount = amount;
          currency = "IDR";
          description = "Transfer dari " # caller.toText();
          status = #completed;
          createdAt = now;
        }, wallet_transactions);
        #ok(msg);
      };
    };
  };

  public query ({ caller }) func getMyTransactionHistory() : async [WalletTypes.WalletTransaction] {
    WalletLib.getTransactionHistory(caller, wallet_transactions);
  };

  public query ({ caller }) func adminGetAllWalletStats() : async {
    totalVolume : Nat;
    pendingWithdrawals : Nat;
    totalUsers : Nat;
  } {
    if (not isAdmin_(caller)) {
      return { totalVolume = 0; pendingWithdrawals = 0; totalUsers = 0 };
    };
    let allTxs = wallet_transactions.toArray();
    var totalVolume = 0;
    var pendingWithdrawals = 0;
    for (tx in allTxs.values()) {
      if (tx.transactionType == #deposit) { totalVolume += tx.amount };
      if (tx.transactionType == #withdrawal and tx.status == #pending) {
        pendingWithdrawals += 1;
      };
    };
    let totalUsers = wallet_balances.size();
    { totalVolume; pendingWithdrawals; totalUsers };
  };
}
