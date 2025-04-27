import Address from './address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate()
  }

  changeName(name: string) {
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
  
  validate(): boolean {
    if(this._id.length === 0) {
      throw new Error("Id is required");
    }

    if(this._name.length === 0) {
      throw new Error("Name is required");
    }

    return true
  }

  activate() {
    if(!this._address) {
      throw new Error("Address is mandatory to activate a customer")
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  set Address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points:number) {
    this._rewardPoints += points;
  }
}