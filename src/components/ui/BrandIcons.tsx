import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Original official brand marks (icon marks, not wordmarks), preserving each brand's
 * real paths and real colors. Rest state: quiet monochrome (grayscale) at reduced
 * opacity; on hover of an ancestor with the `group` class the exact original colors
 * appear. Wrap every link in `group` to get the effect. Some marks get a per-icon rest
 * brightness bump so their silhouette stays legible on the dark ground.
 */

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

interface BaseProps extends IconProps {
  /** viewBox of the original mark */
  box: string;
  /** rest-state filter utility (grayscale, plus optional brightness) */
  rest?: string;
  /** hover-state filter utility */
  hover?: string;
}

function Base({
  size = 18,
  className,
  children,
  box,
  rest = '[filter:grayscale(1)]',
  hover = 'group-hover:[filter:none]',
  ...props
}: BaseProps) {
  return (
    <svg
      viewBox={box}
      width={size}
      height={size}
      aria-hidden
      className={cn(
        'shrink-0 opacity-70 transition-[filter,opacity] duration-200 group-hover:opacity-100',
        rest,
        hover,
        className,
      )}
      {...props}
    >
      {children}
    </svg>
  );
}

/** GitHub — official Octocat mark. Naturally single-color; rendered warm-white so it reads on dark. */
export function GitHubIcon({ size, className, ...props }: IconProps) {
  return (
    <Base box="0 0 256 250" size={size} className={className} {...props}>
      <g fill="#EDE9E0">
        <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
        <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
      </g>
    </Base>
  );
}

/** LinkedIn — official blue rounded square with the white "in". Rest brightened so the square reads on dark. */
export function LinkedInIcon({ size, className, ...props }: IconProps) {
  return (
    <Base box="0 0 256 256" size={size} className={className} rest="[filter:grayscale(1)_brightness(1.5)]" {...props}>
      <path
        fill="#0A66C2"
        d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z"
      />
      <path
        fill="#fff"
        d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z"
      />
    </Base>
  );
}

/** Codeforces — official three-bar mark (gold / blue / red gradients). Rest brightened for legibility. */
export function CodeforcesIcon({ size, className, ...props }: IconProps) {
  // The icon renders several times per page (hero, rails, footer, CP cards). SVG gradient
  // references resolve document-wide by id, and if the first matching def sits in a
  // display:none instance the bars won't paint — so every instance gets unique ids.
  const uid = useId().replace(/:/g, '');
  const gold = `cfGold${uid}`;
  const blue = `cfBlue${uid}`;
  const red = `cfRed${uid}`;
  return (
    <Base
      box="0 0 147.8 115.4"
      size={size}
      className={className}
      rest="[filter:grayscale(1)_brightness(1.5)]"
      {...props}
    >
      <defs>
        <linearGradient id={gold} gradientUnits="userSpaceOnUse" x1="0" y1="74.08" x2="39.38" y2="74.08">
          <stop offset="0" stopColor="#F6C43D" />
          <stop offset="1" stopColor="#FCD975" />
        </linearGradient>
        <linearGradient id={blue} gradientUnits="userSpaceOnUse" x1="54.25" y1="57.75" x2="93.63" y2="57.75">
          <stop offset="0" stopColor="#1480C4" />
          <stop offset="1" stopColor="#1C99D4" />
        </linearGradient>
        <linearGradient id={red} gradientUnits="userSpaceOnUse" x1="108.37" y1="80.28" x2="147.74" y2="80.28">
          <stop offset="0" stopColor="#B11E26" />
          <stop offset="1" stopColor="#C21C24" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gold})`}
        d="M30.3 32.7H9c-5 0-9 4.1-9 9v64.7c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V41.7c0-5-4.1-9-9-9z"
      />
      <path
        fill={`url(#${blue})`}
        d="M84.6 0H63.3c-5 0-9 4.1-9 9v97.4c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V9c0-4.9-4-9-9-9z"
      />
      <path
        fill={`url(#${red})`}
        d="M138.7 45.1h-21.3c-5 0-9 4.1-9 9v52.3c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V54.1c0-5-4-9-9-9z"
      />
    </Base>
  );
}

/**
 * CodeChef — official site icon (favicon from codechef.com, saved at public/logos/codechef.png):
 * the brown "CC" square used across codechef.com. Grayscale at rest, original color on hover.
 */
export function CodeChefIcon({ size = 18, className }: IconProps) {
  return (
    <img
      src="/logos/codechef.png"
      width={size}
      height={size}
      alt=""
      aria-hidden
      className={cn(
        'shrink-0 rounded-[3px] opacity-70 transition-[filter,opacity] duration-200 [filter:grayscale(1)_brightness(1.6)] group-hover:opacity-100 group-hover:[filter:none]',
        className,
      )}
      style={{ objectFit: 'contain' }}
    />
  );
}

export function LeetCodeIcon({ size, className, ...props }: IconProps) {
  return (
    <Base box="-.067 -.068 1024.136 1024.068" size={size} className={className} {...props}>
      <path
        fill="#fefefe"
        d="m1023.524 511.966c0 163.698 0 327.396.477 491.094 0 17.052-3.888 20.94-20.94 20.872q-491.094-.819-982.188 0c-17.051 0-20.94-3.82-20.871-20.872q.818-491.094-.002-982.188c-.066-17.051 3.82-20.94 20.873-20.871q491.094.818 982.188 0c17.052 0 21.008 3.82 20.94 20.871-.477 163.698-.477 327.396-.477 491.094z"
      />
      <path
        fill="#070706"
        d="m454.878 321.736c-61.387 61.386-124.82 121.068-184.774 184.16-44.404 46.722-40.925 113.906 5.593 161.924 55.18 56.68 111.996 111.724 168.063 167.45 21.212 21.963 20.94 47.063 5.388 70.39-14.392 21.485-35.058 34.65-63.092 22.577a132.664 132.664 0 0 1 -35.672-25.578c-51.77-52.315-104.767-103.47-155.99-156.4-89.898-92.83-90.921-232.451-.478-324.668 127.07-129.867 256.05-257.688 384.484-386.054 28.307-28.306 63.843-30.148 87.033-6.002s21.008 55.657-6.411 84.509q-43.176 45.426-86.692 90.443c-30.693 47.609-71.823 84.645-117.453 117.249z"
      />
      <path
        fill="#b4b2b1"
        d="m677.029 641.015h-183.614c-40.925 0-70.186-24.76-69.504-58.113.614-32.262 27.966-55.998 68.208-56.135q187.025-.886 374.05 0c39.833 0 62.342 22.031 62.683 56.476 0 35.74-23.055 57.294-64.934 57.704-62.137.545-124.547.068-186.89.068z"
      />
      <path
        fill="#eaa240"
        d="m386.056 928.1c60.569-7.366 79.053-37.241 57.704-92.967 63.842 33.49 110.837 26.056 162.47-25.577 26.465-26.465 52.52-53.339 79.598-79.19s57.43-26.464 81.44-2.728 23.532 54.566-1.978 81.44c-34.104 35.195-67.457 70.595-103.47 103.266-76.94 69.777-199.917 75.915-275.764 15.756z"
      />
      <path
        fill="#eaa340"
        d="m454.878 321.736a1295.942 1295.942 0 0 1 117.452-117.249c89.693 27.829 142.349 101.152 202.372 164.926 19.575 20.871 11.663 53.747-10.777 72.777a53.338 53.338 0 0 1 -73.87-2.183 821.627 821.627 0 0 1 -74.413-74.278c-44.13-52.315-96.855-66.502-160.765-43.993z"
      />
    </Base>
  );
}

/**
 * AtCoder — no official icon-mark SVG exists; the only published AtCoder logo is the full
 * heraldic crest (crown, unicorn supporters, globe shield, wordmark). Rendered from the
 * official raster (public/logos/atcoder.png, https://img.atcoder.jp/assets/atcoder.png) with
 * the same grayscale-at-rest / full-color-on-hover treatment as the SVG marks.
 */
export function AtCoderIcon({ size = 18, className }: IconProps) {
  return (
    <img
      src="/logos/atcoder.png"
      width={size}
      height={size}
      alt=""
      aria-hidden
      className={cn(
        'shrink-0 opacity-70 transition-[filter,opacity] duration-200 [filter:grayscale(1)] group-hover:opacity-100 group-hover:[filter:none]',
        className,
      )}
      style={{ objectFit: 'contain' }}
    />
  );
}
