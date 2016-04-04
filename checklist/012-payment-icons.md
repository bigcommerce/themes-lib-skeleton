# Inclusion of Payment Icons

Added: 2016-03-07

Bigcommerce customers expect to be able to display a list of payment icons in the footer of their shop. This needs to be administered via the Theme Editor.

## Template

```handlebars
your theme's footer component

<ul class="payment-options">
  {{#if theme_settings.payment-visa}}
    <li class="payment-option-item">
      <svg class="footer-payment-icon" viewBox="0 0 1582 1024">
        <title>Visa</title>
        <path d="M449.88 329.060l135.69-0.001-201.66 495.090-135.54 0.080-104.28-394.52c74.18 30.47 140.14 96.7 167.010 168.79l13.44 68.731zM557.311 824.669l80.109-496.020h128.040l-80.1 496.020h-128.050zM1023.73 527.82c73.91 35.38 108 78.2 107.58 134.75-1.040 102.93-88.49 169.43-223.030 169.43-57.481-0.63-112.82-12.62-142.7-26.44l17.92-111.020 16.481 7.88c42.12 18.53 69.34 26.040 120.62 26.040 36.83 0 76.32-15.22 76.66-48.45 0.21-21.731-16.54-37.27-66.45-61.57-48.56-23.68-112.949-63.449-112.169-134.739 0.76-96.39 89.899-163.71 216.489-163.71 49.59 0 89.439 10.86 114.76 20.83l-17.33 107.52-11.49-5.68c-23.68-10.060-53.979-19.739-95.85-19.039-50.17 0-73.36 22.060-73.37 42.659-0.33 23.3 27.13 38.53 71.88 61.54zM1478.36 329.12l103.651 495.679h-118.86s-11.78-57.030-15.601-74.3c-18.67 0-149.33-0.27-164.010-0.27-4.98 13.44-26.921 74.58-26.921 74.58h-134.55l190.22-454.56c13.41-32.34 36.42-41.13 67.11-41.13h98.96zM1320.42 648.759c24.99 0 86.349 0.001 106.289 0.001-5.080-24.79-29.67-143.17-29.67-143.17l-8.63-42.78c-6.47 18.58-17.729 48.64-16.989 47.319 0 0-40.38 110.11-51 138.63zM311.129 598.46c-52.75-146.33-169.080-223.721-311.15-259.48l1.7-10.29h206.49c27.85 1.1 50.34 10.42 58.080 41.86z"></path>
      </svg>
    </li>
  {{/if}}

  {{#if theme_settings.payment-mastercard}}
    <li class="payment-option-item">
      <svg class="footer-payment-icon" viewBox="0 0 1730 1024">
        <title>Mastercard</title>
        <path d="M1547.71 486.17c19.19 0 28.799 13.969 28.799 41.039 0 40.99-17.46 70.681-42.77 70.681-19.2 0-28.8-13.96-28.8-41.91 0-41 18.33-69.81 42.771-69.81zM1224.84 584.789c0-20.95 15.71-32.281 47.12-32.281 3.49 0 6.11 0.88 12.23 0.88-0.87 31.41-17.45 52.351-39.26 52.351-12.23 0-20.091-7.85-20.091-20.949zM840.889 507.148c0 2.63-0.010 6.14-0.010 10.479h-61.080c5.24-24.43 17.45-37.529 34.9-37.529 16.59 0 26.189 9.6 26.189 27.050zM1217.91 0.057c282.81 0 512.090 229.291 512.090 512.071 0 282.75-229.28 511.98-512.090 511.98-122.7 0-234.36-43-322.57-115 67.26-65 118.609-146.15 146.169-238.080h-42.55c-26.65 81.71-73.49 153.83-134.38 212.070-60.53-58.11-106.931-130.49-133.501-211.83h-42.57c27.44 91.38 77.91 172.83 144.68 237.83-87.981 71-199.12 115-321.16 115-282.79 0-512.050-229.23-512.050-511.98 0-282.78 229.26-512.030 512.050-512.030 122.040 0 233.18 44.050 321.16 115.29-66.769 64.74-117.239 146.17-144.68 237.56h42.57c26.57-81.34 72.971-153.72 133.501-211.43 60.89 57.86 107.729 129.931 134.38 211.65h42.55c-27.56-91.91-78.909-173.23-146.169-238.171 88.21-71.981 199.87-114.931 322.57-114.931zM230.929 646.818h54.109l42.76-257.41h-85.519l-52.37 159.68-2.62-159.68h-78.53l-42.76 257.41h50.61l33.17-196.32 4.35 196.32h37.53l70.69-198.060zM463.048 623.258l1.729-13.071 12.231-74.18c3.5-23.56 4.36-31.42 4.36-41.89 0-40.14-25.3-61.080-72.43-61.080-20.070 0-38.4 2.62-65.44 10.47l-7.86 47.14 5.23-0.89 7.86-2.6c12.231-3.5 29.681-5.25 45.391-5.25 25.29 0 34.9 5.25 34.9 19.2 0 3.49 0 6.11-1.75 13.091-8.73-0.86-16.591-1.74-22.701-1.74-61.080 0-95.981 29.66-95.981 81.15 0 34.040 20.060 56.72 49.73 56.72 25.32 0 43.641-7.87 57.61-25.32l-0.87 21.82h45.37l0.87-5.24 0.88-7.86zM575.607 522.047c-23.56-10.47-26.221-13.080-26.221-22.68 0-11.35 9.6-16.6 27.050-16.6 10.481 0 25.32 0.89 39.28 2.63l7.86-47.99c-13.96-2.62-35.769-4.37-48-4.37-61.090 0-82.89 32.28-82.029 70.67 0 26.19 12.22 44.52 41.029 58.481 22.69 10.47 26.181 13.96 26.181 22.69 0 13.1-9.6 19.199-31.42 19.199-16.58 0-31.42-2.61-48.87-7.851l-7.86 47.99 2.62 0.88 9.59 1.74c3.5 0.86 7.88 1.75 14.86 1.75 12.22 1.74 22.689 1.74 29.68 1.74 57.59 0 84.64-21.82 84.64-69.801 0-28.8-11.34-45.39-38.39-58.48zM695.996 599.717c-13.090 0-18.329-4.367-18.329-14.837 0-2.64 0-5.25 0.88-8.74l14.83-87.24h27.93l6.99-51.481h-27.93l6.11-31.42h-54.1l-23.57 143.090-2.61 16.59-3.5 20.93c-0.88 6.1-1.76 13.1-1.76 18.35 0 30.519 15.72 46.239 43.649 46.239 12.22 0 24.439-1.75 39.269-6.98l6.99-46.24c-3.49 1.74-8.74 1.74-14.851 1.74zM823.417 603.22c-31.43 0-48.001-12.19-48.001-36.64 0-1.76 0-3.5 0.87-6.11h108.21c5.23-21.82 6.98-36.641 6.98-52.351 0-46.26-28.8-75.92-74.17-75.92-54.981 0-95.12 53.231-95.12 124.771 0 61.95 31.41 94.24 92.49 94.24 20.080 0 37.53-2.61 56.731-8.74l8.73-52.35c-19.19 9.6-36.641 13.1-56.721 13.1zM997.066 496.781h3.479c5.24-25.29 12.231-43.62 20.961-60.2l-1.75-0.87h-5.24c-18.33 0-28.811 8.72-45.381 34.050l5.24-32.29h-49.74l-34.040 209.4h54.981c20.070-128.27 25.311-150.090 51.49-150.090zM1155.89 644.24l9.603-58.479c-17.45 8.75-33.16 13.1-46.25 13.1-32.29 0-51.49-23.57-51.49-62.82 0-56.72 28.8-96.85 69.81-96.85 15.71 0 29.68 4.36 48.89 13.96l9.59-55.84c-5.23-1.74-6.98-2.61-13.961-5.23l-21.83-5.25c-6.98-1.74-15.711-2.61-25.311-2.61-72.42 0-123.040 64.57-123.040 156.17 0 68.95 36.66 111.71 96 111.71 14.83 0 27.91-2.63 47.99-7.86zM1328.67 610.212l11.352-74.171c4.36-23.56 4.36-31.42 4.36-41.89 0-40.14-24.43-61.080-71.56-61.080-20.070 0-38.4 2.62-65.45 10.47l-7.86 47.14 5.25-0.89 6.98-2.6c12.22-3.5 30.55-5.25 46.26-5.25 25.31 0 34.899 5.25 34.899 19.2 0 3.49-0.87 6.11-2.61 13.091-7.86-0.86-15.721-1.74-21.831-1.74-61.080 0-95.99 29.66-95.99 81.15 0 34.040 20.070 56.72 49.75 56.72 25.31 0 43.63-7.87 57.59-25.32l-0.88 21.82h45.38v-5.24l0.87-7.86 1.74-10.47zM1396.74 646.862c20.070-128.27 25.299-150.090 51.469-150.090h3.49c5.24-25.29 12.221-43.62 20.971-60.2l-1.76-0.87h-5.24c-18.32 0-28.79 8.72-45.37 34.050l5.24-32.29h-49.74l-33.17 209.4h54.11zM1562.53 646.862l51.47 0.010 41.9-257.41h-54.11l-12.21 73.31c-14.84-19.21-30.55-28.8-52.37-28.8-48 0-89.010 59.32-89.010 129.12 0 52.36 26.19 86.391 66.33 86.391 20.070 0 35.79-6.99 50.62-22.69zM361.787 584.921c0-20.95 15.739-32.281 46.289-32.281 4.36 0 6.98 0.88 12.211 0.88-0.88 31.41-16.58 52.351-39.29 52.351-12.22 0-19.21-7.85-19.21-20.949z"></path>
      </svg>
    </li>
  {{/if}}

  {{#if theme_settings.payment-american-express}}
    <li class="payment-option-item">
      <svg class="footer-payment-icon" viewBox="0 0 2224 1024">
        <title>American Express</title>
        <path d="M2211.25 551.010l12.771 290.999c-22.030 10-105.12 54-136.311 54h-153.22v-21c-17.46 14-49.56 21-78.93 21h-481.7v-78.91c0-11.010-1.84-11.010-11.030-11.010h-8.23v89.92h-158.75v-93.58c-26.61 12.85-55.98 12.85-82.601 12.85h-17.42v80.731h-193.61l-45.89-53-50.45 53h-311.050v-345h316.55l44.95 53.231 49.55-53.231h212.86c24.79 0 65.17 3.68 82.59 21.12v-21.12h189.94c19.26 0 55.979 3.68 80.739 21.12v-21.12h286.28v21.12c16.5-13.769 45.87-21.119 72.48-21.119h159.63v21.12c17.46-11.92 42.229-21.12 74.34-21.12h146.51zM1116.97 763.879c50.46 0 101.849-13.77 101.849-82.58 0-66.981-52.32-80.74-98.2-80.74h-188.090l-76.17 80.74-71.56-80.74h-237.65v245.44h233.99l75.231-80.28 72.5 80.28h113.78v-82.12h74.32zM1472.040 753.788c-5.5-7.36-15.6-16.519-30.26-21.109 16.5-5.5 42.17-26.61 42.17-65.141 0-28.45-10.080-44.060-29.34-55.070-19.27-10.090-42.22-11.92-72.51-11.92h-134.87v245.44h59.66v-89.46h63.29c21.12 0 33.040 1.84 42.22 11.019 10.1 11.94 10.1 33.030 10.1 49.55v28.9h58.74v-47.25c0-22.030-1.86-33.030-9.2-44.96zM1714.28 651.939v-51.36h-196.36v245.44h196.36v-50h-138.55v-49.57h135.8v-49.54h-135.8v-44.97h138.55zM1863.83 846.019c59.64 0 93.622-24.281 93.622-76.591 0-24.78-7.36-40.37-17.44-53.24-14.69-11.92-35.801-19.269-68.831-19.269h-32.12c-8.26 0-15.6-1.83-22.949-3.67-6.42-2.76-11.93-8.26-11.93-17.45 0-8.25 1.85-13.76 9.189-19.269 4.59-3.68 11.93-3.68 22.93-3.68h108.27v-52.29h-117.46c-63.3 0-84.41 38.53-84.41 73.4 0 78 68.82 74.32 122.95 76.15 11 0 17.42 1.85 21.13 5.529 3.67 2.74 7.35 10.090 7.35 17.42 0 6.44-3.68 11.94-7.35 15.61-5.53 3.67-11.95 5.51-22.95 5.51h-113.77v51.84h113.77zM2094.16 846.047c59.64 0 93.571-24.312 93.571-76.621 0-24.78-7.34-40.37-17.42-53.24-14.7-11.92-35.8-19.269-68.84-19.269h-32.11c-8.26 0-15.62-1.83-22.96-3.67-6.42-2.76-11.92-8.26-11.92-17.45 0-8.25 3.67-13.76 9.17-19.269 4.6-3.68 11.949-3.68 22.949-3.68h108.27v-52.29h-117.46c-61.47 0-84.41 38.53-84.41 73.4 0 78 68.82 74.32 122.96 76.15 11 0 17.42 1.85 21.13 5.56 3.68 2.74 7.34 10.090 7.34 17.42 0 6.44-3.66 11.94-7.34 15.61-3.67 3.67-11.93 5.51-22.93 5.51h-113.78v51.84h113.78zM1406.9 656.565c7.36 3.68 11.931 11.002 11.931 21.092 0 11.019-4.57 19.279-11.931 24.779-9.18 3.68-17.439 3.68-28.439 3.68l-71.57 1.84v-55.981h71.57c11 0 21.1 0 28.439 4.59zM1155.47 276.657c-9.18 5.5-17.419 5.501-29.369 5.501h-72.48v-54.14h72.481c10.1 0 22.029 0 29.369 3.64 7.35 4.6 11.010 11.96 11.010 22.96 0 10.090-3.66 19.269-11.010 22.039zM1625.25 218.849l40.37 97.26h-80.74zM984.804 825.359l-90.82-101.851 90.82-96.34v198.19zM1120.6 651.928c21.12 0 34.88 8.261 34.88 29.371 0 21.1-13.76 33.029-34.88 33.029h-77.981v-62.4h77.981zM184.724 316.099l41.3-97.26 40.37 97.26h-81.67zM604.964 651.919l147.721 0.010 65.14 71.58-66.981 72.49h-145.88v-49.57h130.27v-49.54h-130.27v-44.97zM610.465 428.039l-17.432 44.060h-103.68l-17.46-42.22v42.22h-199.090l-21.11-55.981h-50.46l-22.94 55.981h-178.31l76.45-180.76 71.57-163.34h153.25l21.1 40.38v-40.38h178.92l40.37 87.18 39.46-87.18h570.72c26.61 0 49.53 4.59 66.981 19.269v-19.269h156.88v19.269c25.71-14.68 59.66-19.269 98.19-19.269h226.63l21.12 40.38v-40.38h166.98l24.79 40.38v-40.38h163.3v344.1h-165.15l-32.1-52.31v52.31h-205.55l-22.93-55.981h-50.47l-22.95 55.981h-107.35c-42.19 0-73.4-10.1-94.521-21.1v21.1h-255.070v-78.92c0-11.010-1.84-12.85-9.16-12.85h-8.26v91.76h-492.72v-44.050zM1387.62 205.079c-26.61 26.6-31.212 59.64-32.132 96.34 0 44.060 11.020 72.51 30.289 93.609 21.1 21.11 57.79 27.53 86.24 27.53h68.82l22.92-54.14h122.96l22.95 54.14h119.28v-184.43l111.030 184.43h84.4v-245.9h-60.55v170.66l-103.67-170.66h-90.85v232.14l-99.080-232.14h-87.18l-84.42 193.6h-26.61c-15.6 0-32.1-3.68-40.369-11.94-11-12.85-15.61-32.119-15.61-58.739 0-25.7 4.61-44.96 15.61-55.95 11.92-10.12 24.77-13.78 45.88-13.78h55.98v-53.22h-55.98c-40.38 0-72.49 9.16-89.91 28.45zM1266.52 176.639v245.9h59.63v-245.9h-59.63zM995.852 176.639l-0.001 245.919h57.78v-89h63.33c21.11 0 34.88 1.82 44.040 10.090 10.12 12.84 8.271 33.96 8.271 47.72v31.19h60.55v-48.62c0-21.11-1.84-32.13-11-44.060-5.52-7.34-15.6-15.6-28.46-21.1 16.51-7.36 42.22-26.62 42.22-65.14 0-28.46-11.95-44.070-31.22-55.99-19.26-11.010-40.38-11.010-70.64-11.010h-134.87zM756.351 176.657v245.909h197.28v-50.45h-137.64v-49.56h135.8v-50.47h-135.8v-44.050h137.64v-51.38h-197.28zM515.961 422.567h50.459l86.25-192.68v192.68h59.65v-245.9h-96.35l-72.481 167-77.090-167h-94.51v232.14l-100.93-232.14h-87.17l-105.51 245.9h63.3l22.030-54.14h123.88l22.019 54.14h120.19v-192.68z"></path>
      </svg>
    </li>
  {{/if}}

  {{#if theme_settings.payment-discover}}
    <li class="payment-option-item">
      <svg class="footer-payment-icon" viewBox="0 0 3053 1024">
        <title>Discover</title>
        <path d="M1613.79 257.88c145.47 0 258.959 111.689 258.959 253.939 0 143.070-114.26 254.74-258.96 254.74-148.42 0-259.68-110.22-259.68-257.63 0-138.68 116.32-251.050 259.681-251.050zM139.589 267.049c153.96 0 261.36 100.251 261.36 244.471 0 71.92-32.89 141.49-88.359 187.66-46.75 38.84-100.040 56.35-173.73 56.35h-138.86v-488.48h139.59zM250.608 633.92c32.86-29.19 52.451-76.14 52.451-123.090 0-46.86-19.58-92.231-52.44-121.53-31.49-28.53-68.66-39.53-130.080-39.53h-25.519v323.070h25.519c61.42 0 100.060-11.75 130.069-38.92zM444.789 755.54v-488.48h94.88v488.48h-94.88zM771.939 454.44c108.1 39.62 140.132 74.806 140.132 152.456 0 94.47-69.32 160.489-167.891 160.489-72.35 0-124.939-28.67-168.659-93.030l61.26-59.39c21.93 42.481 58.399 65.16 103.669 65.16 42.41 0 73.84-29.269 73.84-68.869 0-20.52-9.53-38.039-28.52-50.489-9.52-5.97-28.46-14.72-65.72-27.84-89.1-32.33-119.739-66.71-119.739-134.16 0-79.769 65.75-139.859 151.83-139.859 53.34 0 102.26 18.28 143.14 54.261l-49.58 65.070c-24.9-27.75-48.27-39.46-76.751-39.46-40.95 0-70.83 23.42-70.83 54.2 0 26.28 16.79 40.261 73.82 61.461zM942.002 511.556c0-141.96 115.352-255.51 259.222-255.51 40.89 0 75.27 8.73 116.899 29.91v112.13c-39.47-38.82-73.85-54.94-119.050-54.94-89.17 0-159.24 74-159.24 167.71 0 98.93 67.95 168.529 163.59 168.529 43.090 0 76.689-15.35 114.709-53.46v112.12c-43.12 20.43-78.17 28.54-119.050 28.54-144.62 0-257.080-111.31-257.080-255.029zM2087.64 595.227l131.51-328.13h102.92l-210.32 500.96h-51.070l-206.72-500.96h103.69zM2365.25 755.577v-488.48h269.39v82.72h-174.49v108.41h167.81v82.72h-167.81v131.94h174.49v82.69h-269.39zM3010.58 411.267c0 74.76-39.351 123.84-111.001 138.53l153.41 205.77h-116.83l-131.36-196.32h-12.43v196.32h-95.019v-488.48h140.94c109.59 0 172.29 52.65 172.29 144.181zM2820.010 491.907c60.8 0 92.91-26.449 92.91-75.499 0-47.54-32.12-72.52-91.39-72.52h-29.15v148.020h27.63z"></path>
      </svg>
    </li>
  {{/if}}

  {{#if theme_settings.payment-paypal}}
    <li class="payment-option-item">
      <svg class="footer-payment-icon" viewBox="0 0 1828 1024">
        <title>Paypal</title>
        <path d="M1507.51 335.27c70.75-1.17 148.249 19.789 130.299 104.839l-43.81 200.4h-101.1l6.76-30.29c-55.030 54.769-193.21 58.269-170.72-67.561 15.72-73.41 92.1-96.72 205.54-96.72 7.86-32.63-14.609-40.76-52.789-39.6-38.21 1.17-84.24 13.979-98.86 20.97l9-73.39c29.21-5.84 67.39-18.649 115.68-18.649zM1514.25 540.328c2.22-9.31 3.39-17.51 5.62-26.819h-24.721c-19.080 0-50.53 4.67-61.79 24.48-14.6 23.3 5.65 43.12 28.101 41.96 25.84-1.17 47.18-12.84 52.79-39.62zM1724.27 255.998h103.729l-84.67 384.51h-102.68zM1252.54 257.189c54.040 0 119.319 40.76 100.199 130.479-16.9 79.231-79.95 125.841-156.48 125.841h-77.68l-28.14 127h-109.18l83.3-383.32h187.98zM1249.19 387.658c6.74-29.14-10.14-52.42-38.29-52.42h-54.040l-22.52 104.85h50.65c28.16 0 57.43-23.29 64.199-52.43zM523.077 335.248c69.89-1.17 147.55 19.789 129.8 104.839l-43.269 200.4h-100.96l6.65-30.29c-53.24 54.769-189.721 58.269-167.53-67.56 15.55-73.41 91-96.72 203.050-96.72 6.67-32.63-15.52-40.76-53.261-39.6-37.71 1.17-83.22 13.979-96.54 20.97l8.87-73.39c27.74-5.84 65.481-18.649 113.19-18.649zM530.837 540.307c1.13-9.31 3.339-17.51 5.549-26.819h-25.519c-17.75 0-48.8 4.67-59.899 24.48-14.44 23.3 4.43 43.12 26.62 41.96 25.51-1.17 47.72-12.84 53.25-39.62zM912.896 340.738l104.161-0.001-239.86 427.24h-112.9l73.8-125.6-41.25-301.64h100.98l16.269 178.52zM271.967 257.166c55.29 0 119.619 40.76 100.439 130.479-16.92 79.231-80.13 125.841-155.75 125.841h-78.981l-27.1 127h-110.59l83.5-383.32h188.48zM268.586 387.636c7.9-29.14-10.139-52.42-37.249-52.42h-54.17l-23.7 104.85h51.92c28.22 0 56.43-23.29 63.199-52.43z"></path>
      </svg>
    </li>
  {{/if}}
</ul>


```

## Theme Editor config

```json
  // schema.json

  {
    "name": "Payment Icons",
    "settings": [
      {
        "type": "checkbox",
        "label": "Show Visa icon",
        "id": "payment-visa",
        "force_reload": true
      },
      {
        "type": "checkbox",
        "label": "Show Mastercard icon",
        "id": "payment-mastercard",
        "force_reload": true
      },
      {
        "type": "checkbox",
        "label": "Show American Express icon",
        "id": "payment-american-express",
        "force_reload": true
      },
      {
        "type": "checkbox",
        "label": "Show Discover icon",
        "id": "payment-discover",
        "force_reload": true
      },
      {
        "type": "checkbox",
        "label": "Show Paypal icon",
        "id": "payment-paypal",
        "force_reload": true
      }
    ]
  }
```

```
  // config.json
  "settings": {
    ...
    "payment-visa": false,
    "payment-mastercard": false,
    "payment-american-express": false,
    "payment-discover": false,
    "payment-paypal": false,
    ...
  }
```