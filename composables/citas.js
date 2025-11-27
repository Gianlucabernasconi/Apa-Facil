import { ref } from 'vue'

const resultado = ref('')

export function apaQuote(names) {
  let trim = names.trim();
  let toArray = trim.split(",");
  let arrayMap = toArray.map((name) => {
    let clean = name.trim().toLowerCase();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  });

  if (arrayMap.length === 1) {
    resultado.value = `${arrayMap[0]},`;
  } else if (arrayMap.length === 2) {
    resultado.value = `${arrayMap[0]} & ${arrayMap[1]},`;
  } else if (arrayMap.length > 2) {
    resultado.value = `${arrayMap[0]} et al.,`;
  }

  return resultado;
}
