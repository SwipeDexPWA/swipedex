document.write(`
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="apple-mobile-web-app-status-bar" content="{{pwacolor}}">
  <meta name="theme-color" content="{{pwacolor}}">

  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="icon-192x192.png" />

  <meta name="author" content="[SD] SwipeDex℠ by {{firstname}} {{middleinitial}} {{lastname}}">
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href="{{sharepwa}}">

  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="{{firstname}} {{middleinitial}} {{lastname}} - [SD] SwipeDex℠" />
  <link rel="apple-touch-icon" href="icon-192x192.png" />

  <meta name="mobile-web-app-capable" content="yes" />

  <meta name="msapplication-TileColor" content="{{pwacolor}}" />
  <meta name="msapplication-TileImage" content="icon-192x192.png" />

  <script type="application/ld+json">
    {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "{{firstname}} {{middleinitial}} {{lastname}} - [SD] SwipeDex℠",
    "url": "{{sharepwa}}",
    "description": "{{companyname}} - {{companydescription}}",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "image": "thumbnail.png",
    "publisher": {
      "@type": "Organization",
      "name": "{{firstname}} {{middleinitial}} {{lastname}} - [SD] SwipeDex℠",
      "url": "{{sharepwa}}"
        }
    }
  </script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.25.16/dist/css/uikit.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/uikit@3.25.16/dist/js/uikit.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/uikit@3.25.16/dist/js/uikit-icons.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="../pwa.Loader.css">
  <link href="../google.Font.css" rel="stylesheet">
  <link href="../page.Style.css" rel="stylesheet">
`);