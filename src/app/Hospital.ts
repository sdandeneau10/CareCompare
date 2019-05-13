export class Hospital {
  name: string;
  address: string;
  state: string;
  imgUrl: string;

  // Providers average charges
  coveredCharges: number;
  // Average total payments to provider medicare + additional
  totalPayments: number;
  // Average total payment by medicare
  averageMedicarePayment: number;

  constructor(name: string, address: string, coveredCharges: number, totalPayments: number, averageMedicarePayments: number) {
    this.name = name;
    this.address = address;
    this.coveredCharges = coveredCharges;
    this.totalPayments = totalPayments;
    this.averageMedicarePayment = averageMedicarePayments;
  }

  /**
   * Gets hospital street address and state
   */
  getFullAddress(): string {
    return this.address + ' ' + this.state;
  }

  /**
   * Subtracts medicare payments from total amount paid
   */
  getApproxOutOfPocket(): number {
    return this.totalPayments - this.averageMedicarePayment;
  }

  /**
   * Gets the price the hopsital charges
   */
  gethospitalPrice(): number {
    return this.coveredCharges;
  }
}
