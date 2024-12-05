import styles from "./styles.module.scss";

export default function Loading({
  position = "fixed",
}: {
  position?: "fixed" | "absolute";
}) {
  return <div className={styles.loading} style={{ position }} />;
}
