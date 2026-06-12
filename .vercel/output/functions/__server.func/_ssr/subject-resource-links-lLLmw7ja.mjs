const subjectResourceLinks = [
  {
    slug: "english",
    label: "ENGLISH",
    href: "https://drive.egovcloud.gov.bd/index.php/s/CobRtJNoc1ISrGv"
  },
  {
    slug: "math",
    label: "MATH",
    href: "https://drive.egovcloud.gov.bd/index.php/s/HwrCrAtDhb9K484"
  },
  {
    slug: "ict",
    label: "ICT",
    href: "https://drive.egovcloud.gov.bd/index.php/s/PjriLZ5LTTdrkDc"
  },
  {
    slug: "physics",
    label: "PHYSICS",
    href: "https://drive.egovcloud.gov.bd/index.php/s/KOdI1T0gyhPiFRz"
  },
  {
    slug: "chemistry",
    label: "Chemistry",
    href: "https://drive.egovcloud.gov.bd/index.php/s/sDHVsdQgt7dVQzO"
  }
];
Object.fromEntries(
  subjectResourceLinks.map((item) => [item.label.toLowerCase(), item])
);
const subjectResourceLinkBySlug = Object.fromEntries(
  subjectResourceLinks.map((item) => [item.slug, item])
);
export {
  subjectResourceLinkBySlug as a,
  subjectResourceLinks as s
};
