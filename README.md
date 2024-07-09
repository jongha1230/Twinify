This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Commit Convention

- ✨ update : 해당 파일에 새로운 기능이 생김
- 🎉 add : 없던 파일을 생성함, 초기 세팅
- 🐛 bugfix : 버그 수정
- ♻️ refactor : 코드 리팩토링
- 🩹 fix : 코드 수정
- 🚚 move : 파일 옮김/정리
- 🔥 del : 기능/파일을 삭제
- 🍻 test : 테스트 코드를 작성
- 💄 style : css
- 🙈 gitfix : gitignore 수정
- 💡 comment : 주석 변경
- 🔨 script : package.json 변경(npm 설치 등)

```
twinify
├─ src
│  ├─ app
│  │  ├─ (providers)
│  │  │  ├─ (auth)
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ signup
│  │  │  │     └─ page.tsx
│  │  │  └─ (root)
│  │  │     ├─ (music)
│  │  │     │  ├─ layout.tsx
│  │  │     │  ├─ page.tsx
│  │  │     │  ├─ search
│  │  │     │  │  └─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     └─ page.tsx
│  │  │     ├─ (my)
│  │  │     │  └─ mypage
│  │  │     │     └─ page.tsx
│  │  │     └─ layout.tsx
│  │  ├─ api
│  │  │  └─ music
│  │  │     ├─ route.ts
│  │  │     └─ [id]
│  │  │        └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components
│  │  └─ Button
│  │     ├─ Button.tsx
│  │     └─ index.ts
│  ├─ contexts
│  ├─ Page
│  │  ├─ index.ts
│  │  └─ Page.tsx
│  └─ types
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock

```

```
twinify
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ dev
│  │     │  ├─ main
│  │     │  └─ main-layout
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ detailpage
│  │           ├─ dev
│  │           ├─ listpage
│  │           ├─ login
│  │           ├─ main
│  │           ├─ main-layout
│  │           ├─ mypage
│  │           └─ searchpage
│  ├─ objects
│  │  ├─ 03
│  │  │  ├─ 3c68e11533a17dcc02f27f02f7d889d8fe7d2d
│  │  │  ├─ d7b488314dcb407ca1d996c4f5c47d1db58e0a
│  │  │  └─ f0a8d5ca449b6e97469d945c521d9ac379e172
│  │  ├─ 04
│  │  │  └─ 015dfc749e938d1274fa542f11af274546f3ee
│  │  ├─ 0a
│  │  │  └─ 3f4fcc78ad0da8cad18f2aefc07c06b1800e13
│  │  ├─ 11
│  │  │  └─ c7068f288ba9f63df092a89bb99fbde83ac391
│  │  ├─ 12
│  │  │  └─ 3c2e4a1c5fd9f116ac1df0b45cb73eff1ca9c3
│  │  ├─ 14
│  │  │  └─ 4ce6c7673ff4bafb959d91482b78ddf439a525
│  │  ├─ 17
│  │  │  ├─ 47a367569081e7f9a1e8768524a94966abd2d9
│  │  │  └─ a36db52d7aed779ee34b725cc912c975b31507
│  │  ├─ 18
│  │  │  └─ 2cd5e1b7b0f624758c8b796521d0e5584cecbe
│  │  ├─ 1a
│  │  │  └─ 69fd2a450afc3bf47e08b22c149190df0ffdb4
│  │  ├─ 1b
│  │  │  └─ ae5c30f2ced827047c6ae6df5d4c933384311a
│  │  ├─ 1d
│  │  │  └─ ce718b7dc7de73fccf3e9c8886034e344ee23f
│  │  ├─ 1f
│  │  │  ├─ b759c73d960f28ec553c17fb8a74a4146eb2cd
│  │  │  └─ ce6acee4edaeb69113234881f8e05427861d61
│  │  ├─ 20
│  │  │  └─ de5ac990457c7ece9ea52baed18ba32e53ebdb
│  │  ├─ 21
│  │  │  └─ f0e93a7fd06171bdd45aa01c12e5a62d7a3a09
│  │  ├─ 22
│  │  │  └─ cdbc2e724f0ee3a2c6b3aee10d91d0c1b3b5af
│  │  ├─ 23
│  │  │  └─ b1198db246261f4b6d78dedb4a2043b55ce471
│  │  ├─ 27
│  │  │  └─ 64567d9601450835198ec0e61b93e40f3764b0
│  │  ├─ 29
│  │  │  └─ 997bdcee3abb992967aab82ce7c7798a3d6313
│  │  ├─ 2a
│  │  │  └─ cfd440d7c9eb66792802a8660bf245a4f5a3ab
│  │  ├─ 2c
│  │  │  └─ 44e1992753f4a7a0c93d71a9db75d73ab5983a
│  │  ├─ 2d
│  │  │  └─ 6cac7a9a62f63441da448204961e9652665d5b
│  │  ├─ 2e
│  │  │  └─ 9293fcd6da4b3b6f7f0de5bfd572ff6f46f51f
│  │  ├─ 30
│  │  │  ├─ 4f6c24e55791c769fb8a247b5b925df9909b98
│  │  │  └─ 7768dcefd71b756d3e590bf5233fffd98f077d
│  │  ├─ 33
│  │  │  └─ 14e4780a0c8785366fdc3b8499668d163e33f8
│  │  ├─ 36
│  │  │  └─ efa3228329e6c5d42cf8a090b373b064172870
│  │  ├─ 37
│  │  │  └─ e113fed37729d6246d51750935bd1aa78d642d
│  │  ├─ 3e
│  │  │  ├─ 830e230fa072aff4387e691e349dc1b4a29de1
│  │  │  └─ ba621aa49255232d1f9ef8d95ff35a04c6a6b6
│  │  ├─ 40
│  │  │  └─ 41dfc7d0971b112878ccf9dd342336ef96c7e5
│  │  ├─ 41
│  │  │  └─ 8e8d42e065552e94bb90c92f82541e68665910
│  │  ├─ 43
│  │  │  └─ c0dff42d4b3a338021ce3e8236ca124506690a
│  │  ├─ 46
│  │  │  ├─ 185552497eb48b4dff908d5a1c259ede96bd7b
│  │  │  ├─ 64ca3879e0237825a7eeef351e997a72c6c8dc
│  │  │  └─ 78774e6d606704bce1897a5dab960cd798bf66
│  │  ├─ 49
│  │  │  └─ cf5e5eb3d4e65cc2b3a6dbe2537ff0c36a611d
│  │  ├─ 4a
│  │  │  └─ 1d270b103a831b87ae4c7e09000e4159c8d721
│  │  ├─ 4c
│  │  │  └─ 5f8ef24614d0557e2c791dbea9f8d5a5d3fe85
│  │  ├─ 4d
│  │  │  └─ a9b591086d4fd2f4db9680c9498bbbc727eb32
│  │  ├─ 4e
│  │  │  └─ a9b6613ad142a8269c4626a81889f6e12a3574
│  │  ├─ 4f
│  │  │  └─ 5687bff6f1ac67247d1bdb403a05b074d55fea
│  │  ├─ 51
│  │  │  ├─ 552ebffade753f75adf4b785ee77b8176abb95
│  │  │  ├─ 74b28c565c285e3e312ec5178be64fbeca8398
│  │  │  └─ f5b4b0f3d4c84cb18932f4bbf3a881cef36045
│  │  ├─ 56
│  │  │  └─ 51cad5781e3157cd16aea7637633a92df08ffc
│  │  ├─ 58
│  │  │  ├─ d8ff12d3dad9b730b3664813898e1cb883ac3a
│  │  │  └─ e38d5bc99366bfbe10d45d467482d57d0ae56f
│  │  ├─ 5a
│  │  │  └─ c38a0fdbe70bd53487899089fe47c1bb51f052
│  │  ├─ 60
│  │  │  └─ 8c969562ce5ada36c9b905f616939019268351
│  │  ├─ 61
│  │  │  └─ d2f3e785e47050ab608fbbf5ee21eb682060ea
│  │  ├─ 63
│  │  │  └─ a66d68ac0ae088eba5e7e2b20547dd30c049ca
│  │  ├─ 68
│  │  │  └─ bcf2af9f88ef25fd31b34d80e080a2be6d3797
│  │  ├─ 69
│  │  │  ├─ 20335578d0ee0ddd4c8e563f89505f348ece03
│  │  │  └─ d5312a3ed0df35c881b5cbc1d6675d98e988ae
│  │  ├─ 6a
│  │  │  └─ 25369ee401559dd6288c392ba748ca69d55c5e
│  │  ├─ 6b
│  │  │  ├─ 0f297cd5376e8b43c3cd19b891b9d082d426d9
│  │  │  └─ 596087d7b64617a338cc64a135c0e284774b6f
│  │  ├─ 71
│  │  │  ├─ 098ff10e339206e307d21fc61374a7f1b4608a
│  │  │  ├─ 534d580cf053347781f5c719f3b8fd89d9f1a8
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 74
│  │  │  └─ 14d9d235cfac5ce9d46b93f7ec7e5cd7ab05b9
│  │  ├─ 76
│  │  │  └─ d7ee9291fe9fb4fce7ec0c3f963918ea4201a1
│  │  ├─ 77
│  │  │  └─ 53ce451f64623c2c4d4978a686d6f5afdb2e10
│  │  ├─ 78
│  │  │  └─ 8bb6acbac0d20f963b49075e2c839376e2e169
│  │  ├─ 79
│  │  │  ├─ 22343f41529723184bc8827db1c1e70157438e
│  │  │  └─ fb9adb04e979856af09a13327f363ac9cc7823
│  │  ├─ 7a
│  │  │  ├─ 301ee2c9675008996ec7ceeb02af4b8e2e753a
│  │  │  └─ 71febd8e5983c9f3ce0cc7664bd645a5d359bd
│  │  ├─ 7b
│  │  │  └─ 2858930495fc4a76d7a51d958bacf2d64eb81f
│  │  ├─ 7c
│  │  │  ├─ d052678be64cbe01b25c7f482a53102a311151
│  │  │  └─ eda057912ff03e3555a595995c56a610f10826
│  │  ├─ 7f
│  │  │  └─ c68cd56fd1c6721fcc5b85d0c667d9727d1119
│  │  ├─ 80
│  │  │  └─ 149509ab604d079ce88bdb8eab06aec651f3bc
│  │  ├─ 81
│  │  │  └─ f8918739ef7827edafdb182ddbda67c92280e9
│  │  ├─ 82
│  │  │  └─ 0decd1311739a018257f5eb6f47df76cc0ab0e
│  │  ├─ 83
│  │  │  └─ b1c6d8a8acdb78cf6eab9be3a8b6c67ce89dc6
│  │  ├─ 86
│  │  │  ├─ 772cb41aa5cf96bde5fb6d37fd9ee3888b2931
│  │  │  └─ e5c5f68d5438a9d94f3e6892c4db3f5e939731
│  │  ├─ 87
│  │  │  ├─ 5c01e819b90038f0c3e4aee2a4dcc2086b0e14
│  │  │  ├─ c34ff7ad43316d8b496522f1dca1f426d0de6c
│  │  │  └─ ec904f6690a50bc76b188e7e1929fd867182c5
│  │  ├─ 89
│  │  │  └─ 975710e0b21a2ff79fcf177d7b5b6952c35945
│  │  ├─ 8b
│  │  │  └─ ce13faba0c0b21c010ab85c026ef3446d69a4b
│  │  ├─ 8d
│  │  │  └─ 12e223637e180e28b6a3b415c7b3d72884b0a9
│  │  ├─ 8e
│  │  │  ├─ 4935c1f37aa783ed77e05f596cff11a93b8967
│  │  │  ├─ 5cca6e9ea9cb22ec2fd1edfdfcf25ae48ca7e0
│  │  │  └─ 7b6578739fd2d35b639f288f3c99deb519817d
│  │  ├─ 8f
│  │  │  └─ 36eb2ab986b29a56b150b02aefbc1946545808
│  │  ├─ 91
│  │  │  └─ 6b262016bf657b01a0a57adcab385af6f0c131
│  │  ├─ 93
│  │  │  └─ 5246e63af63d2869d904eb82a74b8437aea5d6
│  │  ├─ 9a
│  │  │  ├─ 0ce55e24f2046fc1cc24a314f182e3ea1f5573
│  │  │  └─ 86d45ebc7a8dd887327363fd0db6c740d1e79f
│  │  ├─ 9b
│  │  │  └─ 5d9dd8d32a74de812ed1fa266f678fd52ba231
│  │  ├─ 9d
│  │  │  └─ 07f2c24e91bb4e265f2cdc21e08154d888ffec
│  │  ├─ 9f
│  │  │  └─ 7e6c4efce9ad0b0c7e526b5c679fc5d7872645
│  │  ├─ a0
│  │  │  └─ 01801bb866a82373a4697d0b6e5431f82b6c34
│  │  ├─ a2
│  │  │  ├─ 52c2efbacc1a35c1f1581df6145d73d80c4164
│  │  │  └─ 588e2f1fb8c06a6ee503e212ed57c8095d2f55
│  │  ├─ a6
│  │  │  └─ 3c2bc2043f42539c94ff096b648dfd29454612
│  │  ├─ aa
│  │  │  └─ 0fbe4f2dfb8469b25802b9392baebd61a365d6
│  │  ├─ ab
│  │  │  ├─ 2d37f9ec7d2c4a934d7072b01806b7adf86c98
│  │  │  └─ 6d93d4e323ddd5085e618bc6f6b1b3572c7412
│  │  ├─ ad
│  │  │  └─ 64ddd96e4729dd22f53609f812ec6cbaaa65b3
│  │  ├─ af
│  │  │  └─ e35cefdb202d0f33a883b0e1af9b4016234f68
│  │  ├─ b0
│  │  │  ├─ 4ef8ef444ee65811afc3af96fd51242f801fea
│  │  │  └─ 7734aadff13b1f5d73442716164d8422052b38
│  │  ├─ b3
│  │  │  └─ 2162b437c6b430c66338f247a0f7f78ab55471
│  │  ├─ b7
│  │  │  └─ fe804c1e4feee417d7bfc86d5beb74710dd901
│  │  ├─ b9
│  │  │  ├─ 2fe8b64c6215066f768d8c20c922a8f3e03d7c
│  │  │  └─ 66289afd34bddc0c8daf7a4be12c7db4e67733
│  │  ├─ be
│  │  │  └─ 49fd88bec66b5c25f28cd185c6871600002a53
│  │  ├─ bf
│  │  │  ├─ 201c0b87f553428bd04e7de8aeebaada7fdbc5
│  │  │  └─ fb357a7122523ec94045523758c4b825b448ef
│  │  ├─ c0
│  │  │  ├─ bfdb7c66a6c93847e3206edb18a6222ce0dc8a
│  │  │  └─ fcc56e324bd24f2bc5d2db1eddca31824235ac
│  │  ├─ c3
│  │  │  └─ 4ac5e2cd7299a02d2e17cc6ebb4f68c03fedf9
│  │  ├─ c4
│  │  │  ├─ 033664f80d3cb9cb687fb5facbc82aedb302f6
│  │  │  └─ 719be7c09748c989aaf48649c32718ada90465
│  │  ├─ c6
│  │  │  └─ 79b1736322f5863e1cc2be29568124cef0d5fe
│  │  ├─ c7
│  │  │  └─ f6c91adab22a1a6030ff1b445d6c6524a03a53
│  │  ├─ c8
│  │  │  └─ bbe97616348a1158a01293d14f89a0a2cdc393
│  │  ├─ cd
│  │  │  ├─ 284f1bada5dbb680b9bbca123fe980e7b4ef5d
│  │  │  └─ 8183f50b7e62c07bc079bcd8da1ffbb78fa72a
│  │  ├─ d2
│  │  │  ├─ b53100ad70a179c25c77eea3921e5b602638e6
│  │  │  └─ f84222734f27b623d1c80dda3561b04d1284af
│  │  ├─ d3
│  │  │  └─ 465dcd5db62126212826eaff100dcb423c0757
│  │  ├─ d4
│  │  │  ├─ 0a7becc56917eed61473c2b122e099567f14a7
│  │  │  └─ d57c71cc3376caa18fc80514824f3dabcf52fe
│  │  ├─ d6
│  │  │  └─ a08768b3cfb5add24326a5047305a3fb2bffab
│  │  ├─ d8
│  │  │  └─ 4cb19cc0e8433e3031370cfbd77bcf964367ec
│  │  ├─ da
│  │  │  └─ a2fbe5f623f71d50c696306f83b2a8bdd7cf6f
│  │  ├─ dd
│  │  │  └─ 4aed5577076dbd48005621ef014f770a82cc79
│  │  ├─ de
│  │  │  └─ 1ca47bb5b4a2df0bf83fe3cb30c5e3b9a000a4
│  │  ├─ e2
│  │  │  └─ fce105d508b00a0e0b332882597d0b3d090fee
│  │  ├─ e5
│  │  │  └─ 2d1d25232fb07f034eac7022787b4a0ec1d1d2
│  │  ├─ e6
│  │  │  ├─ 460cbcb33ade620dc70b2bf9f39ac466ccdd96
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ e8
│  │  │  └─ baea8e788e0a1dbeed7bc7ec18fa3d09596acb
│  │  ├─ e9
│  │  │  ├─ 1874d60a252a68bcb20666113c4cee94bd852a
│  │  │  └─ a0944e7b319989ec1a7327d9695247c5bd1a41
│  │  ├─ ea
│  │  │  ├─ 4fc102b8caa1524834095b0e615fb0531c983b
│  │  │  ├─ ac192ef1973be8413129141f601f5dafda892f
│  │  │  └─ e7ff203cb6935a244539117fe2194be6997fc6
│  │  ├─ ed
│  │  │  └─ 1c26414ed480a52fb7b0acc6a9ddfaa633b659
│  │  ├─ ee
│  │  │  ├─ b42c50bb503f97dd816ee303edc8b9a68c23f8
│  │  │  └─ d8344aa8c412eab9739a986960b8d3acb0b257
│  │  ├─ f3
│  │  │  └─ bdd489fa82a2add5b7e4e0a3812c76a10cc7ba
│  │  ├─ f6
│  │  │  ├─ 1492f804bf053247dc0029be751748e0b86539
│  │  │  └─ bd09a7b328c788028f4a35d6fcc384e3bfbfce
│  │  ├─ fc
│  │  │  └─ 954fc6b0960d2038ba126c24e4ac6dfa5a9a73
│  │  ├─ fd
│  │  │  ├─ 3dbb571a12a1c3baf000db049e141c888d05a8
│  │  │  └─ 923fd6c34ff2d81a29b7bb7c0daf68239d0b95
│  │  ├─ ff
│  │  │  └─ 04f65e5995083041ae5b6cbef1c7d507e5db93
│  │  ├─ info
│  │  └─ pack
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  ├─ dev
│     │  ├─ main
│     │  └─ main-layout
│     ├─ remotes
│     │  └─ origin
│     │     ├─ detailpage
│     │     ├─ dev
│     │     ├─ listpage
│     │     ├─ login
│     │     ├─ main
│     │     ├─ main-layout
│     │     ├─ mypage
│     │     └─ searchpage
│     └─ tags
├─ .gitignore
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ defaultProfile.webp
│  ├─ icons
│  │  ├─ album.png
│  │  ├─ artist.png
│  │  ├─ playlist.png
│  │  ├─ search.png
│  │  ├─ track.png
│  │  └─ video.png
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (providers)
│  │  │  ├─ (auth)
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ signup
│  │  │  │     └─ page.tsx
│  │  │  ├─ (root)
│  │  │  │  ├─ (music)
│  │  │  │  │  ├─ music
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ search
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ (my)
│  │  │  │  │  └─ mypage
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ layout.tsx
│  │  │  └─ layout.tsx
│  │  ├─ api
│  │  │  └─ music
│  │  │     ├─ route.ts
│  │  │     └─ [id]
│  │  │        └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Button
│  │  │  │  ├─ Button.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ Header
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ index.ts
│  │  │  └─ Sidebar
│  │  │     ├─ index.ts
│  │  │     ├─ Sidebar.tsx
│  │  │     └─ SidebarButton
│  │  │        ├─ index.ts
│  │  │        └─ SidebarButton.tsx
│  │  └─ music
│  ├─ contexts
│  ├─ hooks
│  ├─ stores
│  └─ types
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock

```