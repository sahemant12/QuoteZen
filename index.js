document.addEventListener("DOMContentLoaded", ()=>{

    const newQuoteBtn = document.getElementById("newQuote-btn");
    const author = document.getElementById("author");
    const quote = document.getElementById("quote-value");
    const exportBtn = document.getElementById("export-btn");
    const shareBtn = document.getElementById("share-btn");
    const clipBoardBtn = document.getElementById("clipBoard-btn");
    const quoteContainer = document.querySelector(".quote-container");
    const $defaultIcon = document.getElementById('default-icon');
    const $copiedIcon = document.getElementById('copied-icon');
    
    
    const ACCESS_KEY = "cjmLn0KT05EEiFsQbrpCn2yBp7eLxuSvJm25-waVjRs";
    
    const randomQuoteURL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    const randomBgiURL = `https://api.unsplash.com/photos/random?query=nature&client_id=${ACCESS_KEY}`
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    
    //deafult quote
    defaultQuote();
    
    //fetch new quote and background image Event
    newQuoteBtn.addEventListener("click", ()=>{
        fetchQuote();
        fetchBackgroundImage();
    })
    
    //copy to clipboard Event
    clipBoardBtn.addEventListener("click", copyToClipboard);
    
    //on mouseover show "share" and "export" Button
    quoteContainer.addEventListener("mouseover", showShareExportButton);
    
    //on mouseout hide "share" and "export" Button
    quoteContainer.addEventListener("mouseout", hideShareExportButton);
    
    //Export background-image to user's computer
    exportBtn.addEventListener("click", exportBGI);
    
    //share quote to X.
    shareBtn.addEventListener("click", shareOnX);
    
    
    
    
    function defaultQuote(){
        author.textContent = "By: Swami Vivekananda";
        quote.textContent = "Arise, awake, and stop not until the goal is reached!";
    }
    
    async function fetchQuote(){
        try {
            //get random quote data
            const response = await fetch(randomQuoteURL, options);
            const quoteData = await response.json();
            author.textContent = `By: ${quoteData.data.author}`;
            quote.textContent = quoteData.data.content;
            
          } catch (error) {
            console.error(error);
          }
    }
    async function fetchBackgroundImage(){
        try {
            //get random background image from unsplash
            const response = await fetch(randomBgiURL, options);
            const img = await response.json();
            quoteContainer.style.backgroundImage = `url(${img.urls.full})`;
            document.body.style.backgroundImage = `url(${img.urls.full})`;
            
          } catch (error) {
            console.error(error);
          }
    }
    
    
    function copyToClipboard(){
        $defaultIcon.classList.add('hidden');
        $copiedIcon.classList.remove('hidden');
    
        //copy quote and author name to clipboard
        let clipBoardText = `${quote.textContent} ${author.textContent}`;
        navigator.clipboard.writeText(clipBoardText);
    
        // reset to default state
        setTimeout(() => {
            $defaultIcon.classList.remove('hidden');
            $copiedIcon.classList.add('hidden');
        }, 1 * 1000);
    }
    
    
    function showShareExportButton(){
        setTimeout(()=>{
            shareBtn.closest(".share").classList.remove("hidden");
            exportBtn.classList.remove("hidden"); 
        }, 0.1 * 1000)
    }
    
    
    function hideShareExportButton(){
        setTimeout(()=>{
            shareBtn.closest(".share").classList.add("hidden");
            exportBtn.classList.add("hidden"); 
        }, 0.1 * 1000)
    }
    
    
    function exportBGI(){
        let bgImage = window.getComputedStyle(quoteContainer).backgroundImage;
        
        // Extract the URL from background-image property
        let imageUrl = bgImage.replace(/url\(\"|\"\)$/g, '');
        
        // Create an invisible link element
        let link = document.createElement("a");
        link.href = imageUrl;
        link.target = "_blank";
        link.download = "background-image.jpg"; // Set the default file name
        document.body.appendChild(link);
        link.click(); // Trigger download
        document.body.removeChild(link);
    }
    
    function shareOnX(){
        const textToShare = `${quote.textContent} ${author.textContent}`;
    
        // Construct the URL for Twitter's tweet intent page
        const tweetUrl = "https://X.com/intent/tweet?text=" + encodeURIComponent(textToShare);
    
        // Open the URL in a new window/tab
        window.open(tweetUrl, "_blank");
    }
})
