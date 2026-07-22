import accenture from "../assets/companyLogos/accenture.svg";
import adobe from "../assets/companyLogos/adobe.svg";
import amazon from "../assets/companyLogos/amazon.svg";
import apple from "../assets/companyLogos/apple.svg";
import cisco from "../assets/companyLogos/cisco.svg";
import cognizant from "../assets/companyLogos/cognizant.svg";
import defaultLogo from "../assets/companyLogos/default.svg";
import dell from "../assets/companyLogos/dell.svg";
import flipkart from "../assets/companyLogos/flipkart.svg";
import google from "../assets/companyLogos/google.svg";
import hp from "../assets/companyLogos/hp.svg";
import ibm from "../assets/companyLogos/ibm.svg";
import infosys from "../assets/companyLogos/infosys.svg";
import intel from "../assets/companyLogos/intel.svg";
import meta from "../assets/companyLogos/meta.svg";
import microsoft from "../assets/companyLogos/microsoft.svg";
import netflix from "../assets/companyLogos/netflix.svg";
import oracle from "../assets/companyLogos/oracle.svg";
import paytm from "../assets/companyLogos/paytm.svg";
import phonepe from "../assets/companyLogos/phonepe.svg";
import samsung from "../assets/companyLogos/samsung.svg";
import swiggy from "../assets/companyLogos/swiggy.svg";
import tcs from "../assets/companyLogos/tcs.svg";
import tesla from "../assets/companyLogos/tesla.svg";
import wipro from "../assets/companyLogos/wipro.svg";
import zomato from "../assets/companyLogos/zomato.svg";

const logoMap = {
  accenture,
  adobe,
  amazon,
  apple,
  cisco,
  cognizant,
  dell,
  flipkart,
  google,
  hp,
  ibm,
  infosys,
  intel,
  meta,
  microsoft,
  netflix,
  oracle,
  paytm,
  phonepe,
  samsung,
  swiggy,
  tcs,
  tesla,
  wipro,
  zomato,
};

export default function getCompanyLogo(company) {
  if (!company) return defaultLogo;

  const key = company.toLowerCase().trim();

  return logoMap[key] || defaultLogo;
}