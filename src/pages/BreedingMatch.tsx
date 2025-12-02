import { motion } from "framer-motion";

const BreedingMatch = () => {
  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Breeding Matchmaking
      </motion.h1>

      <motion.p
        className="text-gray-700 mb-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Use AI to find responsible and health-checked mates for your pet.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Coming soon: genetic compatibility, breeder verification, and smart reminders.
      </motion.p>
    </motion.div>
  );
};

export default BreedingMatch;
