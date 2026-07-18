export interface IPlatform {
  name: string;
  handle: string;
  rating: number;
  label: string;
  url: string;
  color: string;
  /** Optional standing note — the tier band or percentile the rating/label denotes. */
  context?: string;
}

export interface IContest {
  result: string;
  name: string;
  year: number;
  /** Total participating teams, when known — renders as "50th of 224 teams". */
  teams?: number;
  highlight?: boolean;
}

export const platforms: IPlatform[] = [
  {
    // Codeforces "Expert" tier is blue.
    name: 'Codeforces',
    handle: 'Jaman_khan',
    rating: 1633,
    label: 'Expert (max)',
    url: 'https://codeforces.com/profile/Jaman_khan',
    color: '#3B82F6',
    context: 'Expert tier — the 1600–1899 rating band',
  },
  {
    // CodeChef 4★ (1800–1999) tier color is purple.
    name: 'CodeChef',
    handle: 'jaman_12',
    rating: 1939,
    label: '4★ (max)',
    url: 'https://www.codechef.com/users/jaman_12',
    color: '#A855F7',
    context: '4★ tier — the 1800–1999 rating band',
  },
  {
    // LeetCode brand accent orange.
    name: 'LeetCode',
    handle: 'Jaman_khan',
    rating: 1957,
    label: 'Top 3.44%',
    url: 'https://leetcode.com/Jaman_khan/',
    color: '#FFA116',
    context: 'Top 3.44% by contest rating',
  },
  {
    // AtCoder 6 Kyu tier color is green.
    name: 'AtCoder',
    handle: 'Jaman',
    rating: 943,
    label: '6 Kyu (max)',
    url: 'https://atcoder.jp/users/Jaman',
    color: '#3FBF5F',
  },
];

/** Month the platform ratings above were last verified (YYYY-MM). */
export const ratingsAsOf = '2026-07';

export const cpStats = {
  problemsSolved: 3000,
  icpcRegionalist: 2,
  ncpcFinalist: true,
};

export const contests: IContest[] = [
  { result: '50th', name: 'ICPC Asia Dhaka Regional Contest', year: 2023, teams: 224, highlight: true },
  { result: '80th', name: 'ICPC Asia Dhaka Regional Contest — DIU', year: 2024, teams: 309, highlight: true },
  { result: '224th', name: 'ICPC Asia Dhaka Regional Preliminary Contest', year: 2022, teams: 1648 },
  { result: 'Champion', name: 'IST Battle of Brains', year: 2023, teams: 30, highlight: true },
  { result: '1st Runner-up', name: 'Intra IST Programming Contest', year: 2022, teams: 44 },
  { result: '18th', name: 'CUET Inter-University Programming Contest', year: 2024 },
  { result: '22nd', name: '7th DRMC International Tech Carnival', year: 2024 },
  { result: '25th', name: 'CoU-BRACNet Inter-University Programming Contest', year: 2023, teams: 59 },
  { result: '47th', name: 'IUT 11th National ICT Fest', year: 2024 },
  { result: '56th', name: 'BUET Inter-University Programming Contest', year: 2023 },
  { result: '59th', name: 'AUST Inter-University Programming Contest', year: 2025, teams: 130 },
  { result: '73rd', name: 'SUST Inter-University Programming Contest', year: 2024, teams: 120 },
  { result: '115th', name: 'National Collegiate Programming Contest', year: 2024, teams: 196 },
];
