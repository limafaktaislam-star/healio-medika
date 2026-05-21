module {
  public type TransactionType = {
    #deposit;
    #withdrawal;
    #transfer_in;
    #transfer_out;
    #service_payment;
    #service_income;
  };

  public type TransactionStatus = {
    #pending;
    #completed;
    #failed;
  };

  public type WalletTransaction = {
    id : Nat;
    userId : Principal;
    transactionType : TransactionType;
    amount : Nat;
    currency : Text;
    description : Text;
    status : TransactionStatus;
    createdAt : Int;
  };

  public type WalletBalance = {
    userId : Principal;
    balanceIdr : Nat;
    lastUpdated : Int;
  };

  public type WithdrawalMethod = {
    #dana;
    #ovo;
    #bank_bca;
    #bank_mandiri;
    #bank_bri;
    #bank_bni;
  };

  public type DepositMethod = {
    #dana;
    #ovo;
    #va_bca;
    #va_mandiri;
    #va_bri;
    #va_bni;
  };
}
