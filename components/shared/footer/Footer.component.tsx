import { Twitter, Github, Mail, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-12 px-5 bg-card border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Brand Column */}
        <div>
          <h1 className="font-black text-2xl text-primary">
            Tag-<span className="text-destructive">It</span>
          </h1>
          <p className="my-2 leading-snug">
            Your web, your rules. Master your links with style and smarts.
          </p>
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:support@tag-it.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-lg font-semibold text-primary  mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-muted-foreground  text-base">
            <li>
              <Link
                href="/#features"
                className="hover:text-primary transition-colors"
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                href="/demo"
                className="hover:text-primary transition-colors"
              >
                Demo
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal/Support Column */}
        <div>
          <h4 className="text-lg font-semibold text-primary  mb-4">Support</h4>
          <ul className="space-y-2 text-muted-foreground  text-base">
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/#testimonial"
                className="hover:text-primary transition-colors"
              >
                Testimonial
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bothrefm Bar */}
      <div className="mt-10 text-center space-y-2 border-t border-muted/20 pt-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-black text-primary">
            Tag-<span className="text-destructive">It</span>
          </span>{" "}
          All rights reserved.
        </p>
        <p className="text-sm justify-center flex items-center gap-2 text-muted-foreground">
          Built with <Heart size={20} className="text-destructive" /> by
          <span className="text-primary"> Kendrick</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
