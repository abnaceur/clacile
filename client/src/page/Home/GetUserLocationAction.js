import axios from "axios/index";

export function getUserLocation() {

    axios.get("http://ip-api.com/json")
    .then(response => {
        return response
    })
    .catch(err => {
        return err;
    });
};