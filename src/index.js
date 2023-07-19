document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('submit-button').addEventListener("click", (e) => {
        e.preventDefault()
        const nameData = document.getElementById('new-name').value
        const restaurantData = document.getElementById('new-restaurant').value
        const imageData = document.getElementById('new-image').value
        const ratingData = document.getElementById('new-rating').value
        const commentData = document.getElementById('new-comment').value
        submitForm(nameData, restaurantData, imageData, ratingData, commentData)
    })

    //fetch the ramen
    function fetchData() {
        fetch('http://localhost:3000/ramens')
            .then(r => r.json())
            .then(data => displayImg(data))
    }

    //display ramen images
    function displayImg(data) {
        for (let key in data) {
            const singleRamen = data[key]
            const ramenUrl = singleRamen.image
            const ramenImg = document.createElement('img')
            ramenImg.src = ramenUrl
            ramenImg.addEventListener("click", (e) => {
                e.preventDefault();
                clickImg(singleRamen);
            })
            document.getElementById('ramen-menu').append(ramenImg)
        }
    }

    //click on image to show details
    function clickImg(ramen) {
        document.getElementById('detail-image').src = ramen.image
        document.getElementById('detail-name').innerText = ramen.name
        document.getElementById('detail-restaurant').innerText = ramen.restaurant
        document.getElementById('rating-display').innerText = ramen.rating
        document.getElementById('comment-display').innerText = ramen.comment
    }

    //submit new ramen w/ form
    function submitForm(name, restaurant, image, rating, comment) {
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "restaurant": restaurant,
                "image": image,
                "rating": rating,
                "comment": comment
            })
        })
        .then(r => r.json())
        .then(newRamne => document.getElementById('ramen-menu').append(newRamen))
    }

})    