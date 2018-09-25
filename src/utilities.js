function getUserDetails() {
  const url = 'http://localhost:8080/user/';
  const account = JSON.parse(localStorage.getItem('ACCOUNT'));
  const user = account.user;
  const token = user.token;
  const auth = `Token ${token}`;
  fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'}
    }).then((responseJson) => {
        const resp = JSON.parse(responseJson._bodyInit);
        console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
}

// function subscriptionStatus(email) {
//     const url = 'http://localhost:8080/subscription/status?mail=' + email;
//     fetch(url)
//         .then((response) => {
//             return response.json();
//         })
//         .then((json) => {
//             return json.package;
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

async function subscriptionStatus(email) {
    if (email) {
        const url = 'https://api.eternityapp.co/v1/accounts/subscription/status?mail=' + email;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
}

function googlePayPurchases(onLicenseUpdate, onLicenseUpdateFailed) {
    window.google.payments.inapp.getPurchases({
        'parameters': {env: "prod"},
        'success': onLicenseUpdate,
        'failure': onLicenseUpdateFailed
    });
}

export { getUserDetails, subscriptionStatus, googlePayPurchases };
