export const fetchData =()=>{
    try {
        return fetch('https://script.google.com/macros/s/AKfycby5G3bS0LUVclquabv8pqOWMSiTn7Lrgf_mSQ_fqyJw4wWxWPBSS1lPZXgfnaudaHU9/exec').then(res => res.json())
    } catch (error) {
        console.log(error);
    }
}

