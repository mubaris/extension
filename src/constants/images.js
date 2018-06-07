const images = [
  {
    author: "Chris Ried",
    country: "Iceland",
    imageUrl: "images/1.jpg",
    location: "Iceland",
    source: "https://unsplash.com/photos/sqJ40H9RtNw"
  },
  {
    author: "Anton Repponen",
    country: "United States",
    imageUrl: "images/2.jpg",
    location: "Hana",
    source: "https://unsplash.com/photos/zNxlvCZhHNA"
  },
  {
    author: "Willian Justen de Vasconcellos",
    country: "Spain",
    imageUrl: "images/3.jpg",
    location: "Gaztelugatxe",
    source: "https://unsplash.com/photos/7kCNXfo35aU"
  },
  {
    author: "Everaldo Coelho",
    country: "Portugal",
    imageUrl: "images/4.jpg",
    location: "Lisbon",
    source: "https://unsplash.com/photos/2GW4S08kd-8"
  },
  {
    author: "Taylor Leopold",
    country: "Iceland",
    imageUrl: "images/5.jpg",
    location: "Seljalandsfoss Waterfall",
    source: "https://unsplash.com/photos/TBoYgfj1JlM"
  },
  {
    author: "Luca Bravo",
    country: "Italy",
    imageUrl: "images/6.jpg",
    location: "Sorapiss",
    source: "https://unsplash.com/photos/ii5JY_46xH0"
  },
  {
    author: "Preben Nilsen",
    country: "Vietnam",
    imageUrl: "images/7.jpg",
    location: "Dong Van",
    source: "https://unsplash.com/photos/3SP5MuwyJtU"
  },
  {
    author: "Stefan Kunze",
    country: "Spain",
    imageUrl: "images/8.jpg",
    location: "Llubi",
    source: "https://unsplash.com/photos/eWFdaPRFjwE"
  },
  {
    author: "Ian Dooley",
    country: "United States",
    imageUrl: "images/9.jpg",
    location: "Albuquerque",
    source: "https://unsplash.com/photos/DuBNA1QMpPA"
  },
  {
    author: "Nadine Shaabaana",
    country: "United States",
    imageUrl: "images/0.jpg",
    location: "Pacifia",
    source: "https://unsplash.com/photos/dVmmlHPtEoE"
  }
];

const tempImg = images[Math.floor(Math.random()*images.length)];
export default tempImg;