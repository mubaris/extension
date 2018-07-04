const images = [
  {
    author: "Chris Ried",
    country: "Iceland",
    image: "images/1.jpg",
    location: "Iceland",
    source: "https://unsplash.com/photos/sqJ40H9RtNw"
  },
  // {
  //   author: "Anton Repponen",
  //   country: "United States",
  //   image: "images/2.jpg",
  //   location: "Hana",
  //   source: "https://unsplash.com/photos/zNxlvCZhHNA"
  // },
  {
    author: "Willian Justen de Vasconcellos",
    country: "Spain",
    image: "images/3.jpg",
    location: "Gaztelugatxe",
    source: "https://unsplash.com/photos/7kCNXfo35aU"
  },
  {
    author: "Everaldo Coelho",
    country: "Portugal",
    image: "images/4.jpg",
    location: "Lisbon",
    source: "https://unsplash.com/photos/2GW4S08kd-8"
  },
  // {
  //   author: "Taylor Leopold",
  //   country: "Iceland",
  //   image: "images/5.jpg",
  //   location: "Seljalandsfoss Waterfall",
  //   source: "https://unsplash.com/photos/TBoYgfj1JlM"
  // },
  // {
  //   author: "Luca Bravo",
  //   country: "Italy",
  //   image: "images/6.jpg",
  //   location: "Sorapiss",
  //   source: "https://unsplash.com/photos/ii5JY_46xH0"
  // },
  // {
  //   author: "Preben Nilsen",
  //   country: "Vietnam",
  //   image: "images/7.jpg",
  //   location: "Dong Van",
  //   source: "https://unsplash.com/photos/3SP5MuwyJtU"
  // },
  // {
  //   author: "Stefan Kunze",
  //   country: "Spain",
  //   image: "images/8.jpg",
  //   location: "Llubi",
  //   source: "https://unsplash.com/photos/eWFdaPRFjwE"
  // },
  {
    author: "Ian Dooley",
    country: "United States",
    image: "images/9.jpg",
    location: "Albuquerque",
    source: "https://unsplash.com/photos/DuBNA1QMpPA"
  },
  {
    author: "Nadine Shaabaana",
    country: "United States",
    image: "images/0.jpg",
    location: "Pacifia",
    source: "https://unsplash.com/photos/dVmmlHPtEoE"
  }
];

const tempImg = images[Math.floor(Math.random()*images.length)];
export default tempImg;