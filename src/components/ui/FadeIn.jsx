import { motion } from "motion/react";

export default function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    className = ""
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
