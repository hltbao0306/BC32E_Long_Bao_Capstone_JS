function getProductFeature() {
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',  //Đường dẫn backend cung cấp
        method: 'GET',//method backend cung cấp
        ResponseType: JSON
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data.content);
        renderProductFeature(result.data.content);
    });
    //Xử lý thất bại
    promise.catch(function (err) {
    });
}

window.onload = function () {
    getProductFeature();
}

const renderProductFeature = (arrProduct) => {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var sp = arrProduct[i];
        html += `
        <div class="grid-item col-12 col-sm-6 col-lg-4">
        <div class="card">
        <div class="thumbnail">
            <img src="${sp.image}" alt="">
        </div>
        <div class="detail">
            <h1>${sp.name}</h1>
            <p>${sp.shortDescription}</p>
        </div>
        <div class="pay">
            <div class="btn-buy">
                <a href="./detail.html?productid=${sp.id}">Buy now</a>
            </div>
            <div class="price">
                <p>${sp.price}$</p>
            </div>
        </div>
    </div>
    </div>
        `;
    }
    document.querySelector('.grid-content').innerHTML = html;
}