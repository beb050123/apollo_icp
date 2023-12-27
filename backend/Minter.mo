import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

shared ({ caller = ledger_canister_id }) actor class Minter() : async Minter {

  public type User = {
    id : Principal;
    city : Text;
    tokenAmount : Nat;
  };

  var users = Buffer.Buffer<User>(10);

  public func addToUsers(principal : Text, city : Text, tokens : Nat) {
    let user : User = {
      id = Principal.fromText(principal);
      city = city;
      tokenAmount = tokens;
    };
    users.add(user);
  };

  public func getAllUsers() : async [User] {
    return Buffer.toArray(users);
  };

  public func getUserDataById(principal : Text) : async User {
    let targetId = Principal.fromText(principal);
    let index = binarySearch(users, targetId);
    if (index >= 0) {
      return users.get(index);
    } else {
      return users.get(0); // or handle not found case
    };
  };

  public shared func deposit_cycles() : async () {
    let amount = ExperimentalCycles.available();
    let accepted = ExperimentalCycles.accept(amount);
    assert (accepted == amount);
  };

  private func binarySearch(arr : Buffer.Buffer<User>, targetId : Principal) : Nat {
    var low : Nat = 0;
    var high : Nat = arr.size() - 1;

    while (low <= high) {
      let mid = low + (high - low) / 2;
      let midId = arr.get(mid).id;

      if (midId == targetId) {
        return mid;
      } else if (midId < targetId) {
        low := mid + 1;
      } else {
        high := mid - 1;
      };
    };

    return 0; // if not found
  };
};
