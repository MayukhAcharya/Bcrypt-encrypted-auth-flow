const data = [
  {
    id: "1",
    firstName: "Mayukh",
    lastName: "Acharya",
    email: "MayukhAcharya2001@gmail.com",
    location: "Unknown",
  },
  {
    id: "2",
    firstName: "Ayus",
    lastName: "Chaudhuri",
    email: "ayuschau2001@gmail.com",
    location: "Panchanantala",
  },
  {
    id: "3",
    firstName: "Subho",
    lastName: "Manna",
    email: "subhoTheMeatMaster@gmail.com",
    location: "Sahara Desert",
  },
  {
    id: "4",
    firstName: "Susmit",
    lastName: "Dutta",
    email: "susmitDutta@gmail.com",
    location: "Jadavpur",
  },
];

const positionsHandler = async (req, res) => {
  try {
    return res.status(200).send({
      data: data,
      status: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports = { positionsHandler };
