function fun()
{
    let ref = document.getElementById("ref");

    let name = "Darling";
    let age = 45;

    let card = `
    <div class="card">
    <img src="../image.png" alt="">
    <h1> Prabhass Rajuu </h1>
    <p> INDIAS BIGGEST SUPER STAR </p>

    <button> Like </button>
    </div>
      `
     let cards = "";
     for (let i = 0; i < 10; i++)
     {
        cards += card;
     }
     ref.innerHTML = cards;
}
