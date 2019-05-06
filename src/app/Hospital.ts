export class Hospital {
  name: string;
  address: string;
  state: string;

  // TODO: get definition from medicare IPPS api documentation
  coveredCharges: number;
  // TODO: get definition from medicare IPPS api documentation
  totalPayments: number;
  // TODO: get definition from medicare IPPS api documentation
  averageMedicarePayment: number;

  constructor(name: string, address: string){
    this.name = name;
    this.address = address;
  }

}
