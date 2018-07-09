let editMode = false;0

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
                foodItemImage.setAttribute('width','100%');

                if (response[i].photo != 'data:image;base64,') {
                    foodItemImage.setAttribute('src', response[i].photo);
                } else {
                    foodItemImage.setAttribute('src', '../assets/logo.png');
                }

                let foodName = document.createTextNode(response[i].food_name);

                let foodItemLabel = document.createElement('H5');
                foodItemLabel.classList.add('mb-0', 'overflow-ellipsis');
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

    const foodName = document.getElementById('modalTitle');
    foodName.removeAttribute('value');
    foodName.setAttribute('value', food.food_name);
    foodName.setAttribute('disabled', '');
    foodName.classList.add('simple-form');

    const foodImage = document.getElementById('foodImage');
    foodImage.setAttribute('src', '../assets/logo.png');
    foodImage.setAttribute('alt', food.food_name);

    if (food.photo != 'data:image;base64,') {
        foodImage.setAttribute('src', food.photo);
    }

    let foodPriceText = 'No price added';

    if (food.price > 0) {
        foodPriceText = food.price;
    }

    const foodPrice = document.getElementById('foodPrice');
    foodPrice.setAttribute('value', foodPriceText);
    foodPrice.setAttribute('disabled', '');

    let descriptionText = document.createTextNode('No description added');

    if (food.description) {
        descriptionText = document.createTextNode(food.description);
    }

    const foodDescription = document.getElementById('foodDescription');
    foodDescription.innerHTML = '';
    foodDescription.appendChild(descriptionText);

    const foodIdInput = document.getElementById('foodId');
    foodIdInput.setAttribute('value', foodId);

    $('#foodModal').modal({backdrop: 'static', keyboard: false});
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
    if (editMode) {
        if (window.confirm('Are you sure you want to discard the changes?')) {
            resetFoodModal();
        }
    } else {
        resetFoodModal();
    }

    $('#foodModal').modal('hide');
});

function resetFoodModal() {
    editMode = false;

    const foodModal = document.getElementById('foodModal');
    foodModal.removeAttribute('data-id');

    const doneButton = document.getElementById('doneButton');
    const cancelButton = document.getElementById('cancelButton');
    const deleteButton = document.getElementById('deleteButton');
    const editButton = document.getElementById('editButton');
    const imageUploader = document.getElementById('imageUploader');

    doneButton.style.display = 'none';
    cancelButton.style.display = 'none';
    imageUploader.style.display = 'none';

    deleteButton.style.display = 'inline-block';
    editButton.style.display = 'inline-block';

    const modalTitle = document.getElementById('modalTitle');
    const foodPrice = document.getElementById('foodPrice');
    const foodDescription = document.getElementById('foodDescription');

    modalTitle.setAttribute('disabled', '');
    foodPrice.setAttribute('disabled', '');
    foodDescription.setAttribute('disabled', '');
}

const editButton = document.getElementById('editButton');
editButton.addEventListener('click', function() {
    editFood();
});

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', function() {
    const foodModal = document.getElementById('foodModal');

    if (window.confirm('Are you sure you want to delete this item?')) {
        deleteFood(foodModal.getAttribute('data-id'));        
    }
});

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', function() {
    if (window.confirm('Are you sure you want to discard the changes?')) {
        resetFoodModal();
        window.location.reload();
    }
});

function deleteFood(foodId) {
    const deleteForm = document.getElementById('deleteFoodForm');

    const foodIdDeleteInput = document.getElementById('foodIdDelete');
    foodIdDeleteInput.setAttribute('value', foodId);

    deleteForm.submit();
}

function editFood() {
    editMode = true;

    const doneButton = document.getElementById('doneButton');
    const cancelButton = document.getElementById('cancelButton');
    const deleteButton = document.getElementById('deleteButton');
    const editButton = document.getElementById('editButton');
    const imageUploader = document.getElementById('imageUploader');

    doneButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    imageUploader.style.display = 'inline-block';

    deleteButton.style.display = 'none';
    editButton.style.display = 'none';

    const modalTitle = document.getElementById('modalTitle');
    const foodPrice = document.getElementById('foodPrice');
    const foodDescription = document.getElementById('foodDescription');

    modalTitle.removeAttribute('disabled');
    foodPrice.removeAttribute('disabled');
    foodDescription.removeAttribute('disabled');

    modalTitle.focus();
}

// Image live preview (Food Modal)
const imageUploadFile = document.getElementById('imageUploadFile');

imageUploadFile.addEventListener('change', () => {
    if (imageUploadFile.files && imageUploadFile.files[0]) {
        let reader = new FileReader();

        reader.onload = (e) => {
            let uploadPreview = document.getElementById('foodImage');

            uploadPreview.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(imageUploadFile.files[0]);
    }
});
