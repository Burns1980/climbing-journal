/* eslint-disable react/prop-types */
export default function PageWrapper({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
