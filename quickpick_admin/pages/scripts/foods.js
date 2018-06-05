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
                foodItem.addEventListener('click', function() {
                    viewFood(response[i]);
                })

                foodList.appendChild(foodItem);
            }
        }
    }
}

request.open('GET', '../php_scripts/get_foods.php', true);
request.send();

// Show food
function viewFood(food) {
    const foodId = food.food_id;
    
    const foodModal = document.getElementById('foodModal');
    foodModal.setAttribute('data-id', foodId);

    const foodNameText = document.createTextNode(food.food_name);
    const foodName = document.querySelector('#foodModal .modal-title');
    foodName.innerHTML = '';
    foodName.appendChild(foodNameText);

    const foodImage = document.getElementById('foodImage');
    foodImage.setAttribute('src', '../assets/logo.png');
    foodImage.setAttribute('alt', food.food_name);

    if (food.photo) {
        foodImage.setAttribute('src', food.photo);
    }

    let foodPriceText = 'No price added';

    if (food.price) {
        foodPriceText = food.price;
    }

    const foodPrice = document.getElementById('foodPrice');
    foodPrice.setAttribute('value', foodPriceText);
    foodPrice.setAttribute('disabled', 'true');

    let descriptionText = document.createTextNode('No description added');

    if (food.description) {
        descriptionText = document.createTextNode(food.description);
    }

    const foodDescription = document.getElementById('foodDescription');
    foodDescription.innerHTML = '';
    foodDescription.appendChild(descriptionText);
    // foodDescription.setAttribute('disabled', 'true');

    $('#foodModal').modal('show');
}

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

// Action button handlers
const closeFoodModalButton = document.querySelector('#foodModal .close');
closeFoodModalButton.addEventListener('click', function() {
    const foodModal = document.getElementById('foodModal');
    foodModal.removeAttribute('data-id');

    $('#foodModal').modal('hide');
});

const editButton = document.getElementById('editButton');
editButton.addEventListener('click', function() {
    console.log('Edit mode');
});

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', function() {
    const foodModal = foodId = document.getElementById('foodModal');

    if (window.confirm('Are you sure you want to delete this item?')) {
        deleteFood(foodModal.getAttribute('data-id'));        
    }
});

function deleteFood(foodId) {
    const deleteForm = document.getElementById('deleteFoodForm');

    const foodIdDeleteInput = document.getElementById('foodIdDelete');
    foodIdDeleteInput.setAttribute('value', foodId);

    deleteForm.submit();
}
