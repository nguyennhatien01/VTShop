
document.getElementById("add-product-form").addEventListener("submit", function(e) 
{
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const image = document.getElementById("image").value;
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push({ name, price, stock, image });
  localStorage.setItem("products", JSON.stringify(products));
  alert("Thêm sản phẩm thành công!"); this.reset();
});

document.getElementById("add-product-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!file) {
    alert("Vui lòng chọn một ảnh!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageBase64 = reader.result;

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, price, stock, image: imageBase64 });
    localStorage.setItem("products", JSON.stringify(products));

    alert("Thêm sản phẩm thành công!");
    document.getElementById("add-product-form").reset();
  };

  reader.readAsDataURL(file); // Chuyển ảnh sang base64
});







   