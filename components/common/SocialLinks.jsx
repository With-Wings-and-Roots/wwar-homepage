import Image from 'next/image';

const SocialLinks = ({ footer }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg md:text-xl font-medium text-center mb-2">
        Connect with us
      </h3>

      <div className="flex justify-center gap-6">
        {footer?.socials
          ?.filter((social) => social.icon)
          .slice(0, 3)
          .map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition duration-300"
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={32}
                height={32}
                className="w-8 h-8 brightness-0"
              />
            </a>
          ))}
      </div>
    </div>
  );
};

export default SocialLinks;