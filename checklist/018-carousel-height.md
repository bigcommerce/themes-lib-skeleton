# Carousel image handling

Added: 2016-03-14

Consider the tradeoffs of a carousel with background images vs. one with image tags: background-images provide much more flexibility with dictating a fixed carousel height, but sometimes at the expense of merchants' images being cropped in ways they may not expect. Image tags ensure the carousel's aspect ratio matches its content, but there are more opportunities for a terrible-looking layout should a merchant upload a wonky-sized image.

We often receive support issues related to merchants adding images with embedded text, and those images not working on smaller screens where much of the text is cut off because of a `background-size: cover;`.

One option to consider is a theme editor setting where merchants can pick the aspect ratio of their carousel. If we can ensure a consistent ratio as the carousel scales down, we can at least instruct merchants to crop their images to a specific size, and then everyone pretty much wins.

## Theme Editor config

```json
  // schema.json

  {
    "name": "Carousel",
    "settings": [
      {
        "type": "select",
        "label": "Image Aspect Ratio",
        "id": "carousel-image-aspect-ratio",
        "options": {
          {
            "value": fixed-600,
            "label": "Fixed Height (600px tall)"
          },
          {
            "value": fixed-800,
            "label": "Fixed Height (800px tall)"
          },
          {
            "value": ratio-16-9,
            "label": "maintain 16:9 ratio"
          },
          {
            "value": ratio-4-1,
            "label": "maintain 4:1 ratio"
          }
        }
      }
    ]
  }
```
