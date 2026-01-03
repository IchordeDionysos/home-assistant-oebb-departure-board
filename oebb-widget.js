class OebbCard extends HTMLElement {
    setConfig(config) {
      this.config = config;

      if (this.content) return;

      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '0px';
      this.content.style.height = config.height || '400px';
      card.appendChild(this.content);
      this.appendChild(card);

      const widgetHtml = this._getHtmlTemplate(config);
      
      this.content.innerHTML = `
        <iframe 
          style="width: 100%; height: 100%; border: none; border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg));" 
          srcdoc='${widgetHtml}'>
        </iframe>
      `;
    }

    _getHtmlTemplate(config) {
      return `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="utf-8">
            <style>body { margin: 16px 0; background: transparent; }</style>
            <script src="https://fahrplan.oebb.at/webapp/staticfiles/hafas-widget-core.1.0.0.js?language=de_DE"></script>
        </head>
        <body>
            ${config.widget}
        </body>
        </html>
      `.replace(/'/g, "&apos;"); // Escape quotes for safety
    }
  }

  customElements.define('oebb-widget', OebbCard);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "oebb-widget",
    name: "ÖBB Widget",
    description: "Displays the ÖBB Scotty widget with either a live departure board or trip planner."
  });
