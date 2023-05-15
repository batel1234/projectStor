//מחלקה של מוצר
class Product {
    constructor(id, name, desc, price, category, img) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.category = category;
        this.img = img;
    }       
}
//מערך של כל המוצרים בחנות
const products = [
    new Product(1, "בגד ", "וסט אלגנטי",  70, "ביגוד","וסט.jpg"),
    new Product(2, "בגד ", "ז'קט עור",  100, "ביגוד","ז'קט.jpg"),
    new Product(3, "בגד ", "חולצה גברית", 80, "ביגוד","חולצה גברית.jpg"),
    new Product(4, "בגד ", "מכנסיים לשבת",  60, "ביגוד","מכנסיים.jpg"),
    new Product(5, "בגד ", "מעיל יפה",  200, "ביגוד","מעיל.jpg"),
    new Product(1, "נעל ", "נעלי סניקרס",  300, "הנעלה","נעלי ספורט.jpg"),
    new Product(2, "נעל ", "נעלי בית",  30, "הנעלה","נעלי בית.jpg"),
    new Product(3, "נעל ", "נעלי עקב ",  140, "הנעלה","נעל עקב.jpg"),
    new Product(4, "נעל ", "מגפונים",  270, "הנעלה","מגפונים.jpg"),
    new Product(5, "נעל ", "מגפים טובים",  180, "הנעלה","מגפי גומי .jpg"),
    new Product(1, "צמיד ", "צמיד פנינים ",  10000, "צמידים","צמיד פנינים.jpg"),
    new Product(2, "צמיד ", "צמיד מתכת ",  4000, "צמידים","צמיד מתכת 3.jpg "),
    new Product(3, "צמיד ", "צמיד לולאות ", 7000, "צמידים","צמיד לולאות.jpg"),
    new Product(4, "צמיד", "צמיד זהב ",  16100, "צמידים","צמיד זהב.jpg"),
    new Product(5, "צמיד", "צמיד יהלומים ", 25500, "צמידים","צמיד יהלומים.jpg")
]
//סל קניות
const cart = [];
// הצגת סל קניות ריק על המסך

//------------------------------פונקציות תצוגה
let sum = 0;
let div5;
//יצירת כפתורי קטגוריות
function createCategories() {
    const button1 = document.createElement("button");
    button1.innerHTML = "ביגוד";
    button1.classList.add("butt");
    button1.onclick = function () {
        const arr = getProductByCategory("ביגוד")
        renderProduct(arr);
    }
    const button2 = document.createElement("button");
    button2.innerHTML = "הנעלה";
    button2.classList.add("butt");
    button2.onclick = function () {
        const arr = getProductByCategory("הנעלה")
        renderProduct(arr);
    }
    const button3 = document.createElement("button");
    button3.innerHTML = "צמידים";
    button3.classList.add("butt");
    button3.onclick = function () {
        const arr = getProductByCategory("צמידים")
        renderProduct(arr);
    }

    var b1 = document.createElement("button");
    b1.innerHTML = "סיום הזמנה";
    b1.onclick = function () {
        if (document.getElementById("dtl") != null)
            document.getElementById("dtl").remove();
        document.getElementById("main").style.display = "none";
        document.getElementById("sal").style.display = "none";
        document.getElementById("form").style.display = "";
        document.getElementById("sum").innerHTML = sum;
        document.getElementById("sum").style.color = "white";
    }
   
    var text = document.createElement("p");
    text.innerHTML = "עגלה";
    document.getElementById("sal").appendChild(text);
    document.getElementById("sal").appendChild(b1);
    
    div5 = document.createElement("div");
    document.getElementById("sal").appendChild(div5);
    div5.innerHTML = sum+ " :סהכ לתשלום " ;
    div5.classList.add("sum");

    //הצגת הקטגוריות(הכפתורים) על המסך
    const mainDiv = document.getElementById("main");
    mainDiv.appendChild(button1);
    mainDiv.appendChild(button2);
    mainDiv.appendChild(button3);
}

//פונקציה שמכניסה את האיברים למערך לפי קטגוריה
function getProductByCategory(category) {
    const arr = products.filter(p => p.category == category)
    return arr;
}
//תצוגת המוצרים על המסך
function renderProduct(arr) {
    const lastProducts = document.getElementsByClassName("elements");
    //מחיקת דיו מוצרים קודם אם קיים
    if (lastProducts.length != 0) 
        lastProducts[0].remove();
    //יצירת דיו מוצרים חדש
     const divProducts = document.createElement("div");
     divProducts.classList.add("elements");
   /*מעבר על מערך מוצרים ויוצרת כרטיס לכל אחד*/
    for (let product of arr) {
        const div = createProductCard(product);
        divProducts.appendChild(div);
        div.classList.add("divcard")
}
document.getElementById("main").appendChild(divProducts);
}

// פונקציה מקבלת אוביקט של מוצר, יוצרת דיו ותמונה בהתאם למוצר
// מכניסה את הפיסקה והתמונה לתוך דיו ומחזירה אלמנט חדש
function createProductCard(product) {
    const div = document.createElement("div");
    div.classList.add("card");
    const p = document.createElement("p");
    p.innerHTML = `${product.desc} ${product.price}`;
    const img = document.createElement("img");
    img.src = `img/${product.img}`;
    const btn = document.createElement("button");
    btn.innerHTML = "הוסף לסל";
    div.appendChild(p);
    div.appendChild(img);
    div.appendChild(btn);
    div.style.marginTop = "20px";
    btn.onclick = function () {
        div_sal(product)
    }
    div.ondblclick = function () {
        createDetails(product);
    }
    return div;
}

function div_sal(product) {
    var d = document.createElement("div");
    const t = document.createElement("p");
    t.innerHTML = `${product.desc} ${product.price}`;
    var b = document.createElement("button");
    b.innerHTML = "X";
    d.appendChild(t);
    d.appendChild(b);
    d.classList.add("d");
    document.getElementById("sal").appendChild(d);
    b.onclick = function () {
        removeCardDetails(d);
        removeCardDetails(b)
        sum -= product.price;
        div5.innerHTML = sum + " :סהכ לתשלום ";
    }
    sum += product.price;
    div5.innerHTML = sum + " :סהכ לתשלום ";

}

// פונקציה שממינת את כול המוצרים לפי קטגוריות 
function getProductByCategoty(category) {
    let arr;
    let i = 0;
    for (let p = 0; p < products.length; p++) {
        if (p.category == category) {
            arr[i] = products[p];
            i++;
        }
    }
    const filteredArray = products.filter(p => p.category == category);
    return filteredArray;
}
// הצגת המוצרים והפרטים שלהם
function createDetails(product) {
    if (document.getElementById("dtl")!=null)
        document.getElementById("dtl").remove();
    const d = document.createElement("div");
    d.id = "dtl";
    const p = document.createElement("p");
    d.classList.add("divb");
    const img = document.createElement("img");
    img.src = `img/${product.img}`;
    img.classList.add("imgb");
    let b = document.createElement("button");
    b.innerHTML = "X";
    b.classList.add("x");
    p.innerHTML = ` ${"קוד מוצר: "}${product.id} ${" תאור: "}${product.desc} ${" קטגוריה: "}${product.category}  ${" שם מוצר: "}${product.name} ${" מחיר: "}${product.price}`;
    d.appendChild(b);
    b.onclick = function () {
        removeCardDetails(d);
    }
    d.appendChild(p);
    d.appendChild(img);
    document.getElementById("big").appendChild(d);
}
// מוחק פריטים מהסל קניות
function removeCardDetails(div) {
    div.remove();
}