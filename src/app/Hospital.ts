export class Hospital {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  imgUrl: string;
  lat: number;
  long: number;
  distance: number;
  geocodeLoaded: boolean;
  imgLoaded: boolean;

  // Providers average charges
  coveredCharges: number;
  // Average total payments to provider medicare + additional
  totalPayments: number;
  // Average total payment by medicare
  averageMedicarePayment: number;

  constructor(name: string, address: string, city: string, state: string, zip: string, totalDischarges: number, coveredCharges: number,
              totalPayments: number, averageMedicarePayments: number) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.coveredCharges = coveredCharges;
    this.totalPayments = totalPayments;
    this.averageMedicarePayment = averageMedicarePayments;
    /*this.imgUrl = '../../assets/img/placeholder.jpg';*/
  }

  /**
   * Gets hospital street address and state
   */
  getFullAddress(): string {
    return this.address + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
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

  getLat(): number {
    return this.lat;
  }
  setLat(num: number): void {
    this.lat = num;
  }
  getLong(): number {
    return this.long;
  }
  setLong(num: number): void {
    this.long = num;
  }
  getName() {
    return this.name;
  }
  isGeocoded() {
    return this.geocodeLoaded;
  }
  setGeocoded() {
    this.geocodeLoaded = true;
  }
  isImgLoaded() {
    return this.imgLoaded;
  }
  setImgLoaded() {
    this.imgLoaded = true;
  }
  setImageUrl(img: string) {
    this.imgUrl = img;
  }
  getCity() {
    return this.city;
  }
  getState() {
    return this.state;
  }
}
