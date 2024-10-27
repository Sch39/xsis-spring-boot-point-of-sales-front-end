const SELECTED_PRODUCTS_STORAGE_NAME='productsStorage';
let productsStorage = [];
let totalPrice = 0;

$(document).on('click', '.quantity button', function () {
  const products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME)) ||[];
  var button = $(this);
  var oldValue = button.parent().parent().find('input').val();
  let productId = button.parent().parent().parent().data('id');
  
  const currentProduct = products.find(product=>product.id == productId);
  if (button.hasClass('btn-plus')) {
    var newVal = parseFloat(oldValue) + 1;
      if (newVal > currentProduct.stock) {
        return;
      }
  } else {
      if (oldValue > 1) {
          var newVal = parseFloat(oldValue) - 1;
      } else {
          newVal = 1;
      }
  }
  button.parent().parent().find('input').val(newVal);
  button.parent().parent().find('input').trigger('change');
});

function renderLoadingPlaceholder(containerId) {
  $('#' + containerId).html(`
    <tr class="placeholder-glow">
      <td><span class="placeholder col-1"></span></td>
      <td><span class="placeholder col-4"></span></td>
      <td><span class="placeholder col-6"></span></td>
      <td><span class="placeholder col-2"></span></td>
      <td><span class="placeholder col-1"></span></td>
    </tr>
    <tr class="placeholder-glow">
      <td><span class="placeholder col-1"></span></td>
      <td><span class="placeholder col-4"></span></td>
      <td><span class="placeholder col-6"></span></td>
      <td><span class="placeholder col-2"></span></td>
      <td><span class="placeholder col-1"></span></td>
    </tr>
    <tr class="placeholder-glow">
      <td><span class="placeholder col-1"></span></td>
      <td><span class="placeholder col-4"></span></td>
      <td><span class="placeholder col-6"></span></td>
      <td><span class="placeholder col-2"></span></td>
      <td><span class="placeholder col-1"></span></td>
    </tr>
    <tr class="placeholder-glow">
      <td><span class="placeholder col-1"></span></td>
      <td><span class="placeholder col-4"></span></td>
      <td><span class="placeholder col-6"></span></td>
      <td><span class="placeholder col-2"></span></td>
      <td><span class="placeholder col-1"></span></td>
    </tr>
  `);
}

function truncateDescription(description, limit = 10) {
  const words = description.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : description;
}

function renderSearchResult(containerId, dataObj){
  $('#'+containerId).html('');
  const products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME))||[];

  dataObj.forEach(item => {
    const isSelected = products.some(product => product.id == item.id);

    $('#'+containerId).append(`
    <tr class="${isSelected ? 'text-muted': ''}">
      <td>
        <button class="btn btn-sm text-dark p-2 btn-outline-dark add-product position-relative ${isSelected ? 'disabled' : ''}" data-id="${item.id}">
        <i class="fas fa-cart-plus mr-1 ${isSelected ? 'text-info' : 'text-primary'}"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ${isSelected ? '' : 'd-none'}">
          <i class="fas fa-check mr-1"></i>
        </span>
        </button>
      </td>
      <td>
        <a href="/products/${item.slug}/detail" target="_blank" class="text-decoration-none">
          ${item.slug} 
          <i class="fas fa-external-link-alt ml-1" title="Open in new tab"></i>
        </a>
      </td>
      <td class="${isSelected ? 'text-decoration-line-through' : ''}">
          ${item.name}/
          <br>
          ${truncateDescription(item.description, 5)}
      </td>
      <td>${item.price}</td>
      <td>${item.stock}</td>
    </tr>
    `);
  });
}

$(document).on('submit', '#searchForm', function (e) { 
  e.preventDefault();
  let searchText = $('#searchInput').val();
  let sortBy = $('#sortBy').val();
  let sortDirection = $('#sortDirection').val();
  let itemPerPage = $('#itemPerPage').val()=="" ? 5: $('#itemPerPage').val();

  loadSearchResult(0, itemPerPage, sortBy, sortDirection, searchText);
});

$('#addProductModalButton').click(function (e) { 
  e.preventDefault();
  $('#modalTitleId').text('Tambah Produk');

  $('#modalBodyId').html(`
      <div class="row align-items-center justify-content-center py-3 px-xl-8">
        <div class="col-12 text-start">
          <form id="searchForm">
            <div class="input-group">
              <input id="searchInput" type="text" class="form-control" placeholder="Search by variant">
              <button id="searchButton" class="btn btn-outline-primary ml-2" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </div>
            
            <div class="row align-items-center justify-content-start mt-3">
              <div class="col-auto">
                <label for="sortBy" class="mr-2">Sort By:</label>
                <select id="sortBy" class="form-select">
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="createdAt">Date Added</option>
                </select>
              </div>
              
              <div class="col-auto">
                <label for="sortDirection" class="mr-2">Direction:</label>
                <select id="sortDirection" class="form-select">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div class="col-auto">
                <label for="itemPerPage" class="mr-2">Item Perhalaman:</label>
                <input type="number" id="itemPerPage" class="form-control">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id='searchResult' class='row align-items-center justify-content-center py-3'>
      </div>
    `);

  $('#modalBodyId').append(`
     <div id='searchNav' class='row align-items-center justify-content-center mb-5'>
      <nav aria-label="" class='col-12'>
        <ul id="paginationContainer" class="pagination justify-content-center">
        </ul>
      </nav>
    </div>

    `);
    
    $('#searchResult').html(`
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Pilih</th>
              <th>Slug</th>
              <th>Nama/Deskripsi</th>
              <th>Harga</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody id="productTableBody">
          </tbody>
        </table>
      </div>
      `);
    loadSearchResult();

  $('#modalId').modal('show');
});

function loadSearchResult(pageNumber=0, itemPerPage=5, sortBy='name', sortDirection='asc', searchText=null){
  renderLoadingPlaceholder('productTableBody');

  $.ajax({
    type: "GET",
    url: BASE_URL+"/api/variants/search",
    data: {
      page: pageNumber,
      sortBy,
      sortDirection,
      variantName: searchText,
      // productName: searchText,
      // categoryName: searchText,
      size:itemPerPage
    },
    dataType: "json",
    success: function (response) {
      if (response.success) {
        console.log('success');
        
        const data = response.data.content;
        productsStorage = data;

        updatePagination(response.data.page);
        setTimeout(()=>{
          renderSearchResult('productTableBody', data);
        }, 1500)
      } else {
        alert("Gagal memuat data!");
      }
    },
    error: function (e) {
      console.log("message: "+e);
      
      alert("Terjadi kesalahan!");
    }
  });
}

function updatePagination (pageInfo) { 
  $('#paginationContainer').html('');
  for (let i = 0; i < pageInfo.total_pages; i++) {
    $('#paginationContainer').append(`
      <li class="page-item">
            <button class="page-link  ${i === pageInfo.number ? 'active' : ''}" data-page="${i}">
              ${i===0 ? '<span aria-hidden="true">&laquo;</span>':
                i===(pageInfo.total_pages-1)? '<span aria-hidden="true">&raquo;</span>':
                '<span>'+(i+1)+'</span>'
              }
            </button>
      </li>
      `);
    
  }
 }

 $(document).on('click', '.page-link', function () {
  const page = $(this).data('page');
  loadSearchResult(page);
});

 $(document).on('click', '.add-product', function () {
  const id = $(this).data('id');
  const selectedProduct = productsStorage.find(product=> product.id===id);

  let products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME)) || [];
  const existingProducts = products.find(product=>product.id==id);

  if (!existingProducts) {
    products.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1,
      stock: selectedProduct.stock,
    });
  }
  localStorage.setItem(SELECTED_PRODUCTS_STORAGE_NAME, JSON.stringify(products));

  renderSearchResult('productTableBody', productsStorage);
  renderProductCart();
  renderCartSummary();
});

function renderProductCart(){
  const products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME)) ||[];

  $('#selectedProductContainer').html('');

  if (products.length == 0) {
    $('#selectedProductContainer').append(`
      <tr class="align-middle">
              <td colspan="5" class="text-lg-center py-5">Belum ada barang dipilih!</td>
      `);
  }else{
    products.forEach(product => {
      $('#selectedProductContainer').append(`
          <tr data-id="${product.id}">
                <td class="align-middle"><img src="https://picsum.photos/id/${product.item}/200/200" alt="" style="width: 50px;">
                  ${product.name}
                </td>
                <td class="align-middle">${product.price}</td>
                <td class="align-middle">
                  <div class="input-group quantity mx-auto" style="width: 100px;">
                    <button class="btn btn-sm btn-primary btn-minus">
                      <i class="fa fa-minus"></i>
                    </button>
                    <input type="text" class="form-control form-control-sm bg-secondary text-center quantity-input" value="${product.quantity}">
                    <button class="btn btn-sm btn-primary btn-plus">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td class="align-middle total-price">${(product.price*product.quantity).toFixed(2)}</td>
                <td class="align-middle"><button class="btn btn-sm btn-primary removeProduct"><i class="fa fa-times"></i></button></td>
          </tr>
        `);
    });
  }
}

window.onload=()=>{
  renderProductCart();
  renderCartSummary();
}

$('#selectedProductContainer').on('change', '.quantity-input', function(e) {
  e.preventDefault();
  const input = $(this)
  let currentVal = input.val();
  const products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME)) ||[];

  let productId = input.parent().parent().parent().data('id');
  
  const currentProduct = products.find(product=>product.id == productId);
  if (currentVal>currentProduct.stock) {
    input.val(currentProduct.stock);
  }else if(currentVal<=0){
    input.val(1);
  }
  input.parent().parent().parent().find('.total-price').text(currentProduct.price * input.val());

    if (currentProduct.quantity !== input.val()) {
      const updatedProducts = products.map(product=>{
          if(product.id == productId){
            return {...product, ...{ quantity: input.val()}};
          }
          return product;
        });

        localStorage.setItem(SELECTED_PRODUCTS_STORAGE_NAME, JSON.stringify(updatedProducts));
        renderCartSummary();
      }
});

$('#selectedProductContainer').on('click', '.removeProduct',function (e) { 
  e.preventDefault();
  const button = $(this);
  const productId = button.parent().parent().data('id');
  let products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME))||[];
  
  const updatedProducts = products.filter(product => product.id != productId);

  localStorage.setItem(SELECTED_PRODUCTS_STORAGE_NAME, JSON.stringify(updatedProducts));
  renderProductCart();
  renderCartSummary();
});

function renderCartSummary(){
  let products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME))||[];
  totalPrice = 0;
  products.forEach(product => {
    totalPrice += (product.quantity*product.price);
  });

  totalPrice = totalPrice.toFixed(2);
  $('#cartTotalPrice').text(`Rp ${totalPrice}, 00`);
  $('#cartSubtotalPrice').text(`Rp ${totalPrice}, 00`);
}

$('#resetProductCart').click(function (e) { 
  e.preventDefault();
  localStorage.setItem(SELECTED_PRODUCTS_STORAGE_NAME, "[]");
  renderProductCart();
  renderCartSummary();
});

// payment
const paymentReferenceHtmlInput = '<input type="text" id="paymentReference" class="form-control" disabled>';

$('#paymentModalButton').click(function (e) { 
  e.preventDefault();
  $('#paymentModalTitleId').text('Pembayaran');
  $('#paymentModalBodyId').html(`
    <form>
      <div class="row g-3 align-items-center">
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                  <label for="paymentReference" class="col-form-label">Reference</label>
                </div>
                <div class="col" id="paymentReferenceInputContainer">
                  
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                  <label for="paymentTotal" class="col-form-label">Total Tagihan</label>
                </div>
                <div class="col">
                  <input disabled data-type="currency" type="text" id="paymentTotal" class="form-control" >
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                  <label for="payMoney" class="col-form-label">Uang Dibayarkan</label>
                </div>
                <div class="col">
                  <input placeholder="Masukan jumlah uang dibayarkan" data-type="currency" type="text" id="payMoney" class="form-control" >
                  <span class="text-danger error d-none">Uang kurang njirr!!</span>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                  <label for="paymentChange" class="col-form-label">Kembalian</label>
                </div>
                <div class="col">
                  <input disabled data-type="currency" type="text" id="paymentChange" class="form-control" >
                </div>
            </div>
        </div>

        <div class="col-12 mt-3 text-end">
          <button type="button" id="cancelButton" class="btn btn-secondary me-2" data-bs-dismiss="modal" aria-label="Close">Batal</button>
          <button disabled type="button" id="payButton" class="btn btn-primary">Bayar <i class="fas fa-spinner fa-spin d-none"></i></button>
        </div>
      </div>
    </form>
    `);
    $('#paymentReferenceInputContainer').html(paymentReferenceHtmlInput);
    $('#paymentTotal').val(totalPrice);
    $('#paymentModalId').modal('show');
});

$(document).on('input', 'input[data-type="currency"]', function () {
  const input = $(this);
  input.val(input.val().replace(/[^0-9.]/g, ""));
});

$(document).on('change', '#payMoney', function () {
  const input = $(this);
  let change = parseFloat(input.val())-totalPrice;
  $('#paymentChange').val(change.toFixed(2));
  let errorSpan = input.parent().find('.error');
  if (change<0) {
    errorSpan.removeClass('d-none');
    $('#payButton').prop('disabled', true);
  }else{
    errorSpan.addClass('d-none');
    $('#payButton').removeAttr('disabled');
  }
});

$(document).on('click', '#payButton', function () {
  $('#paymentReferenceInputContainer').html(`
    <div class="placeholder-glow">
            <span class="placeholder col form-control-placeholder"></span>
    </div>
    `);

    $('#payButton').prop('disabled', true);
    $('#payButton').find('i').removeClass('d-none');

    let orders = [];
    let products = JSON.parse(localStorage.getItem(SELECTED_PRODUCTS_STORAGE_NAME))||[];

    if (products.length==0) {
      $('#paymentReferenceInputContainer').html(paymentReferenceHtmlInput);
      $('#payButton').find('i').addClass('d-none');
      alert('Tidak ada product yang dipilih');
      return;
    }

    products.forEach(product => {
      orders.push({
        variant_id: product.id,
        quantity: product.quantity,
      });
    });
   
    const data = {
      pay_money: $('#payMoney').val(),
      orders,
    };
    
    const dataJson = JSON.stringify(data);
    
    // setTimeout(()=>{
    //   $('#paymentReferenceInputContainer').html(paymentReferenceHtmlInput);
    //   $('#payButton').find('i').addClass('d-none');
    //   $('#paymentReference').val('sby-g7ttds-uug');
    //   $('#payMoney').prop('disabled', true);
    //   $('#paymentModalTitleId').text('Pembayaran: Lancar boss q!');
      
    // }, 2500);

    $.ajax({
      type: "POST",
      url: BASE_URL+"/api/orders",
      data: dataJson,
      contentType: 'application/json',
      success: function (response) {
          setTimeout(()=>{
          $('#paymentReferenceInputContainer').html(paymentReferenceHtmlInput);
          $('#payButton').find('i').addClass('d-none');
          $('#paymentReference').val(response.data.reference);
          $('#payMoney').prop('disabled', true);
          $('#paymentModalTitleId').text('Pembayaran: Lancar boss q!');
          
        }, 1000);
      },
      error(){
        alert("Gagal melakukan transaksi!");
      }
    });
});