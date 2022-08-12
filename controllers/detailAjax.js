function getProductByID(id) {
    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + id,  //Đường dẫn backend cung cấp
        method: 'GET',//method backend cung cấp
        ResponseType: JSON
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data.content);
        renderProductDetail(result.data.content);
        renderRealateProduct(result.data.content);
    });
    //Xử lý thất bại
    promise.catch(function (err) {
    });
}

const renderProductDetail = (ObjectProduct) => {
    var html = '';
    var sp = ObjectProduct;
    html = `
    <div class="thumbnail col-md-4">
    <img src="${sp.image}" alt="">
</div>
<div class="detail col-md-8">
<div class="card_detail">
    <h1>${sp.name}</h1>
    <span>${sp.description}</span>
    <p>Available size</p>
    <ul>
        <li><a href="#">36</a></li>
        <li><a href="#">37</a></li>
        <li><a href="#">38</a></li>
        <li><a href="#">39</a></li>
        <li><a href="#">40</a></li>
        <li><a href="#">41</a></li>
        <li><a href="#">42</a></li>
    </ul>
    <h2>${sp.price}$</h2>
    <div class="soLuong">
        <a href="#" class="plus">+</a>
        <span>1</span>
        <a href="#" class="minus">-</a>
    </div>
        <button>Add to cart</button>
</div>
</div>
        `;
    document.querySelector('.container').innerHTML = html;
}

const renderRealateProduct = (ObjectProduct) => {
    var html = '';
    var arrayProduct = ObjectProduct.relatedProducts
    for (const value of arrayProduct) {
        html += `
        <div class="grid-item col-12 col-sm-6 col-lg-4">
            <div class="card">
            <div class="thumbnail">
                <img src="${value.image}" alt="">
            </div>
            <div class="detail">
                <h1>${value.name}</h1>
                <p>${value.shortDescription}</p>
            </div>
            <div class="pay">
                <div class="btn-buy">
                    <a href="./detail.html?productid=${value.id}">Buy now</a>
                </div>
                <div class="price">
                    <p>${value.price}$</p>
                </div>
            </div>
        </div>
        </div>
            `;
    }
    document.querySelector('.grid-content').innerHTML = html;
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid');
    console.log('params', myParam)
    getProductByID(myParam);
}