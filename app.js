// DOM //
const h4 = document.querySelector('h4'),
p  = document.querySelector('p'),
copybBtn = document.querySelector('#copy'),
body = document.querySelector('body'),
copyAlert = document.querySelector('#buttonDiv'),
alert = window.getComputedStyle(copyAlert,'::before');


// Fetch Ramdom Quote //
const fetchQuote = async () => {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();
    let ramdomQuote =  _.sample(data);  //underscore.js plugin : select ramdom elements from array
 
    h4.innerHTML = `<i class="fas fa-quote-left" id="quoteIcon"></i><br> ${ramdomQuote.text}`;
    p.innerText = ramdomQuote.author;
}

// Copy Button //
copybBtn.addEventListener('click', () => { 

    //create input field to be able to copy 
    const area = document.createElement('textarea');
    body.appendChild(area);
    area.value = h4.innerText;
    area.select();
    area.setSelectionRange(0, 99999);   //for mobile
 
    //copy to clip-board
    if(window.isSecureContext == true)
    {
        navigator.clipboard.writeText(area.value);   //Clipboard Web API 
    }
    else{
        document.execCommand('copy');               // execCommand Web API : no-longer supported
    }

    //copied message
    area.style.display = 'none';
    copyAlert.dataset.content = 'copied!'   // .dataset : enable to select the data- attr from html
    setTimeout(() => {
        copyAlert.dataset.content = '';
    }, 800);

 } )


// Show Ramdom Quotes Every 10s
setInterval(fetchQuote,10000);
