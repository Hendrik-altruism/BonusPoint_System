import{html,render}from"https://eild-nrw.github.io/er_rel_trainer/versions/v2/libs/lit/lit.min.js";export{render};export function main(languages,active,onChange){return html`
    <select @change=${event=>onChange(event.target.value)}>
      ${Object.keys(languages).map((lang=>html`
        <option .selected=${lang===active} value="${lang.toLowerCase()}">
          ${lang.toUpperCase()} - ${languages[lang]}
        </option>
      `))}
    </select>
  `}
//# sourceMappingURL=templates.min.mjs.map