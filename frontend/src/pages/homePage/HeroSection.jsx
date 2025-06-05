/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full py-20 px-6 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
        >
          Connect with Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            College Alumni Network
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg md:text-xl mb-8"
        >
          Discover job opportunities, connect with seniors, and build your
          professional future today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link to="/alumni-list">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link to="/posts">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
