// Get foods from database
let request = new XMLHttpRequest();

request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
        let response = JSON.parse(request.responseText);

        if (response.length > 0) {
            let foodList = document.getElementById('foodList');

            for (let i = 0; i < response.length; i++) {
                let foodItemImage = document.createElement('IMG');
                foodItemImage.classList.add('food-img', 'mr-3');

                if (response[i].photo) {
                    foodItemImage.setAttribute('src', response[i].photo);
                } else {
                    foodItemImage.setAttribute('src', '../assets/logo.png');
                }

                let foodName = document.createTextNode(response[i].food_name);

                let foodItemLabel = document.createElement('H5');
                foodItemLabel.classList.add('mb-0');
                foodItemLabel.appendChild(foodName);

                let foodItem = document.createElement('LI');
                foodItem.classList.add('list-group-item', 'd-flex', 'align-items-center');
                foodItem.setAttribute('data-id', response[i].food_id);
                foodItem.appendChild(foodItemImage);
                foodItem.appendChild(foodItemLabel);

                foodList.appendChild(foodItem);
            }
        }
    }
}

request.open('GET', '../php_scripts/get_foods.php', true);
request.send();

// Show alert for successful insert
const url = new URL(window.location.href);

if (url.searchParams.get('foodInserted') == 'true') {
    $('#foodAddedAlert').fadeTo(2000, 500).slideUp(500, function() {
        $('#foodAddedAlert').slideUp(500);
    });
}

// Image live preview
let imageFile = document.getElementById('image');

imageFile.addEventListener('change', () => {
    if (imageFile.files && imageFile.files[0]) {
        let reader = new FileReader();

        reader.onload = (e) => {
            let uploadPreview = document.getElementById('uploadPreview');

            uploadPreview.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(imageFile.files[0]);
    }
});
