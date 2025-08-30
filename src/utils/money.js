export default function money(value = 0) {
  return new Intl.NumberFormat().format(value);
} 