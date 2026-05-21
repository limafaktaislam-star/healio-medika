import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import WalletTypes "../types/wallet";

module {

  public func getBalance(
    userId : Principal,
    balances : Map.Map<Principal, WalletTypes.WalletBalance>,
  ) : WalletTypes.WalletBalance {
    switch (balances.get(userId)) {
      case (?b) { b };
      case null {
        { userId = userId; balanceIdr = 0; lastUpdated = Time.now() };
      };
    };
  };

  public func addBalance(
    userId : Principal,
    amount : Nat,
    balances : Map.Map<Principal, WalletTypes.WalletBalance>,
  ) : WalletTypes.WalletBalance {
    let current = getBalance(userId, balances);
    let updated : WalletTypes.WalletBalance = {
      userId = userId;
      balanceIdr = current.balanceIdr + amount;
      lastUpdated = Time.now();
    };
    balances.add(userId, updated);
    updated;
  };

  public func deductBalance(
    userId : Principal,
    amount : Nat,
    balances : Map.Map<Principal, WalletTypes.WalletBalance>,
  ) : { #ok : WalletTypes.WalletBalance; #err : Text } {
    let current = getBalance(userId, balances);
    if (current.balanceIdr < amount) {
      return #err("saldo tidak cukup");
    };
    let updated : WalletTypes.WalletBalance = {
      userId = userId;
      balanceIdr = current.balanceIdr - amount;
      lastUpdated = Time.now();
    };
    balances.add(userId, updated);
    #ok(updated);
  };

  public func transfer(
    fromId : Principal,
    toId : Principal,
    amount : Nat,
    balances : Map.Map<Principal, WalletTypes.WalletBalance>,
  ) : { #ok : Text; #err : Text } {
    switch (deductBalance(fromId, amount, balances)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        ignore addBalance(toId, amount, balances);
        #ok("transfer berhasil");
      };
    };
  };

  public func recordTransaction(
    tx : WalletTypes.WalletTransaction,
    transactions : List.List<WalletTypes.WalletTransaction>,
  ) : () {
    transactions.add(tx);
  };

  public func getTransactionHistory(
    userId : Principal,
    transactions : List.List<WalletTypes.WalletTransaction>,
  ) : [WalletTypes.WalletTransaction] {
    transactions.toArray().filter(func(t : WalletTypes.WalletTransaction) : Bool {
      Principal.equal(t.userId, userId)
    });
  };

  public func withdrawalMethodToText(m : WalletTypes.WithdrawalMethod) : Text {
    switch (m) {
      case (#dana)        { "DANA" };
      case (#ovo)         { "OVO" };
      case (#bank_bca)    { "Transfer Bank BCA" };
      case (#bank_mandiri){ "Transfer Bank Mandiri" };
      case (#bank_bri)    { "Transfer Bank BRI" };
      case (#bank_bni)    { "Transfer Bank BNI" };
    };
  };

  public func depositMethodToText(m : WalletTypes.DepositMethod) : Text {
    switch (m) {
      case (#dana)        { "DANA" };
      case (#ovo)         { "OVO" };
      case (#va_bca)      { "VA BCA" };
      case (#va_mandiri)  { "VA Mandiri" };
      case (#va_bri)      { "VA BRI" };
      case (#va_bni)      { "VA BNI" };
    };
  };
}
