require.config({
  paths: {
   "docSearch" : "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min"
  }
});

require(["docSearch"], function(docsearch){
    docsearch({
        apiKey: '53eb751204374323cd4564da62d1368c',
        indexName: 'albumentations',
        inputSelector: '.md-search__input',
        debug: false
    });
});
