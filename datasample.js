const userData = {
    picture: "",
    fName: "A",
    lName: "A",
    ageVal: "1",
    cityVal: "Quảng Nam",
    positionVal: "aaa",
    salaryVal: 123123,
    sDateVal: "2002-02-05",
    emailVal: "tanducho234@gmail.com2",
    phoneVal: "3762703989"
  };
  
  fetch('https://67175f68b910c6a6e027c4a7.mockapi.io/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
  