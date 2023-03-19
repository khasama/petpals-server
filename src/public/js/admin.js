let addContent, editContent, currentMovie;
const base = `${window.origin}/admin`;
const api = `${window.origin}/api/v1`;
let subcategoryTable = $("#dataTable2").DataTable();
let subitemTable = $("#dataTable3").DataTable();
$(document).ready(function () {

    $("#dataTable").DataTable({ "order": [] });

    // new DataTable('#dataTable2');



    $("#newMovie").click(() => {
        const formData = new FormData();
        const type = $("#type").val();
        const name = $("#addName").val().trim();
        const aka = $("#addAka").val().trim();
        const thumb = $("#addThumb")[0].files[0];
        const background = $("#addBackground")[0].files[0];
        if (name && aka) {
            formData.append("name", name);
            formData.append("aka", aka);
            formData.append("thumb", thumb);
            formData.append("type", type);
            formData.append("background", background);
            $.ajax({
                type: "POST",
                url: `${base}/movie/`,
                data: formData,
                processData: false,
                contentType: false,
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        showAlert("danger", `${result.message}`);
                    }
                }
            });
        } else {
            showAlert("danger", `Not emty !!!`);
        }
    });


    $("#newCategory").click(() => {
        $("#newCategory").prop('disabled', true);
        const category = $("#addCategoryName").val().trim();
        if (category) {
            $.ajax({
                type: "POST",
                url: `${base}/category/`,
                data: { category },
                success: (result) => {
                    if (result.status == "success") {
                        location.reload();
                    } else {
                        showAlert("danger", `${result.message}`);
                        $("#newCategory").prop('disabled', false);
                    }
                }
            });
        } else {
            showAlert("danger", `Not emty !!!`);
            $("#newCategory").prop('disabled', false);
        }
    });

    $("#newSubcategory").click(() => {
        $("#newSubcategory").prop('disabled', true);
        const id = $("#idCategory").val().trim();
        const subcategory = $("#addSubcategoryName").val().trim();
        if (subcategory) {
            $.ajax({
                type: "POST",
                url: `${base}/category/sub/${id}`,
                data: { subcategory },
                success: (result) => {
                    if (result.status == "success") {
                        const subcategories = result.data;
                        resetSubcategoryTable(subcategories);
                        showAlert("success", `Add success`);
                        $("#newSubcategory").prop('disabled', false);
                        $("#addSubcategoryName").val('');
                    } else {
                        showAlert("danger", `${result.message}`);
                        $("#newSubcategory").prop('disabled', false);
                    }
                }
            });
        } else {
            showAlert("danger", `Not emty !!!`);
            $("#newSubcategory").prop('disabled', false);
        }
    });

    $("#newItem").click(() => {
        $("#newItem").prop('disabled', true);
        const item = $("#addItemName").val().trim();
        if (item) {
            $.ajax({
                type: "POST",
                url: `${base}/item/`,
                data: { item },
                success: (result) => {
                    if (result.status == "success") {
                        location.reload();
                    } else {
                        showAlert("danger", `${result.message}`);
                        $("#newItem").prop('disabled', false);
                    }
                }
            });
        } else {
            showAlert("danger", `Not emty !!!`);
            $("#newItem").prop('disabled', false);
        }
    });

    $("#newSubitem").click(() => {
        $("#newSubitem").prop('disabled', true);
        const id = $("#idItem").val().trim();
        const subitem = $("#addSubitemName").val().trim();
        if (subitem) {
            $.ajax({
                type: "POST",
                url: `${base}/item/sub/${id}`,
                data: { subitem },
                success: (result) => {
                    if (result.status == "success") {
                        const subitems = result.data;
                        resetSubitemTable(subitems);
                        showAlert("success", `Add success`);
                        $("#newSubitem").prop('disabled', false);
                        $("#addSubitemName").val('');
                    } else {
                        showAlert("danger", `${result.message}`);
                        $("#newSubitem").prop('disabled', false);
                    }
                }
            });
        } else {
            showAlert("danger", `Not emty !!!`);
            $("#newSubitem").prop('disabled', false);
        }
    });

});

function resetSubcategoryTable(subcategories) {
    subcategoryTable.destroy();
    const list = $("#subcategoryData");
    list.html("");
    subcategories.forEach((ele) => {
        list.append(
            `
                <tr id=${ele._id}>
                    <td>
                        ${ele._id}
                    </td>
                    <td>
                        ${ele.name}
                    </td>
                    <td>
                        ${ele.slug}
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="btn btn-danger"
                            data-id="${ele._id}" onclick="deleteSubcategory(this)">Delete</a>
                    </td>
                </tr>
            `
        );
    });
    subcategoryTable = $("#dataTable2").DataTable();
}

function resetSubitemTable(subitems) {
    subitemTable.destroy();
    const list = $("#subitemData");
    list.html("");
    subitems.forEach((ele) => {
        list.append(
            `
                <tr id=${ele._id}>
                    <td>
                        ${ele._id}
                    </td>
                    <td>
                        ${ele.name}
                    </td>
                    <td>
                        ${ele.slug}
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="btn btn-danger"
                            data-id="${ele._id}" onclick="deleteSubitem(this)">Delete</a>
                    </td>
                </tr>
            `
        );
    });
    subitemTable = $("#dataTable3").DataTable();
}


function getCategory(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `${api}/category/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const category = result.data;
                $("#updateCategoryName").val(category.name);
                $("#updateCategorySlug").val(category.slug);
                $("#idCategory").val(category._id);
                resetSubcategoryTable(category.subcategory);
                $("#categoryModal").modal("show");
            } else {
                showAlert("danger", `${result.message}`);
            }
        }
    });
}
function deleteSubcategory(ele) {
    $(ele).prop('disabled', true);
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/category/sub/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    showAlert("success", `Delete success`);
                    subcategoryTable.destroy();
                    $(`#${id}`).remove();
                    subcategoryTable = $("#dataTable2").DataTable();
                } else {
                    showAlert("danger", `${result.message}`);
                    $(ele).prop('disabled', false);
                }
            }
        });
    }

}

function getItem(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `${api}/item/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const item = result.data;
                $("#updateItemName").val(item.name);
                $("#updateItemSlug").val(item.slug);
                $("#idItem").val(item._id);
                resetSubitemTable(item.subitem);
                $("#itemModal").modal("show");
            } else {
                showAlert("danger", `${result.message}`);
            }
        }
    });
}
function deleteSubitem(ele) {
    $(ele).prop('disabled', true);
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/item/sub/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    showAlert("success", `Delete success`);
                    subitemTable.destroy();
                    $(`#${id}`).remove();
                    subitemTable = $("#dataTable3").DataTable();
                } else {
                    showAlert("danger", `${result.message}`);
                    $(ele).prop('disabled', false);
                }
            }
        });
    }

}

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username && password) {
        $.ajax({
            type: "POST",
            url: `${base}/auth/login`,
            data: {
                username,
                password
            },
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    window.location = '/';
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                console.log(err);
                alert(err.statusText);
            },
        });
    } else {
        alert("Not emty !!!");
    }
}

function logout() {
    $.ajax({
        url: `${base}/auth/logout`,
        type: "POST",
        success: (result) => {
            if (result.status == "success") {
                window.location = '/login';
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
        },
    });
}

function activeBtn(ele, type) {
    let ctn;
    if (type == 'ep') {
        ctn = document.getElementById("list-eps");
    } else {
        ctn = document.getElementById("list-link");
    }
    let currents = ctn.getElementsByClassName("active");
    if (currents.length > 0) {
        for (let i = 0; i < currents.length; i++) {
            currents[0].className = currents[0].className.replace(
                " active",
                ""
            );
        }
    }
    $(ele).addClass("active");
}

function calculateTime(date) {
    const curentDate = new Date();
    const lastAccess = parseInt((curentDate.getTime() - Date.parse(date)) / 1000 / 60 / 60);

    if (lastAccess < 24) {
        return `${lastAccess} hour${lastAccess > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 24 && lastAccess < 168) {
        return `${parseInt(lastAccess / 24)} day${parseInt(lastAccess / 24) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 168 && lastAccess < 720) {
        return `${parseInt(lastAccess / 24 / 7)} week${parseInt(lastAccess / 24 / 7) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 720 && lastAccess < 8760) {
        return `${parseInt(lastAccess / 24 / 7 / 30)} month${parseInt(lastAccess / 24 / 7 / 30) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 8760) {
        return `${parseInt(lastAccess / 24 / 365)} year${parseInt(lastAccess / 24 / 365) > 1 ? 's' : ''} ago`;
    }

}

function showAlert(type, mess) {
    const area = $("#alert-area");
    const num = area.children().length;
    const alert = `<div class="alert alert-${type} alert-${num}" role="alert"> ${mess} </div>`;
    area.append(alert);
    setInterval(() => {
        $(`.alert-${num}`).hide(100);
    }, 3000);
}

function sendRefreshToken() {
    $.ajax({
        url: `${base}/auth/refresh-token`,
        type: "POST",
        success: (result) => {
            if (result.status == "success") {
                showAlert("success", `renew access token !!!`);
            } else {
                window.location = '/login';
            }
        }
    });
}

function copyLink(ele) {
    const link = $(ele).attr("data-link");
    if (link != '' && link) {
        copyToClipboard(link).then(() => {
            showAlert("success", "Copied");
        });
    }
}

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

$(document).bind("ajaxError", (event, request, settings) => {
    if (request.status === 401) {
        sendRefreshToken();
    } else {
        showAlert("danger", `Lỗi Server ${request.statusText}`);
    }

});