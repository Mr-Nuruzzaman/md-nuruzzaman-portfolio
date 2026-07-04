export interface IPlatform {
  name: string;
  handle: string;
  rating: number;
  label: string;
  url: string;
  color: string;
}

export interface IContest {
  result: string;
  name: string;
  year: number;
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
  },
  {
    // CodeChef 4★ (1800–1999) tier color is purple.
    name: 'CodeChef',
    handle: 'jaman_12',
    rating: 1939,
    label: '4★ (max)',
    url: 'https://www.codechef.com/users/jaman_12',
    color: '#A855F7',
  },
  {
    // LeetCode brand accent orange.
    name: 'LeetCode',
    handle: 'Jaman_khan',
    rating: 1957,
    label: 'Top 3.44%',
    url: 'https://leetcode.com/Jaman_khan/',
    color: '#FFA116',
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

export const cpStats = {
  problemsSolved: 3000,
  icpcRegionalist: 2,
  ncpcFinalist: true,
};

export const contests: IContest[] = [
  { result: '50th', name: 'ICPC Asia Dhaka Regional Contest', year: 2023, highlight: true },
  { result: '80th', name: 'ICPC Asia Dhaka Regional Contest', year: 2024, highlight: true },
  { result: 'Champion', name: 'IST Battle of Brains', year: 2023, highlight: true },
  { result: '1st Runner-up', name: 'Intra IST Programming Contest', year: 2022 },
  { result: '18th', name: 'CUET Inter-University Programming Contest', year: 2024 },
  { result: '22nd', name: '7th DRMC International Tech Carnival', year: 2024 },
  { result: '25th', name: 'CoU-BRACNet Inter-University Programming Contest', year: 2023 },
  { result: '47th', name: 'IUT 11th National ICT Fest', year: 2024 },
  { result: '56th', name: 'BUET Inter-University Programming Contest', year: 2023 },
];
