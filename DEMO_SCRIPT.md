# tgBTC Liquidity Protocol - Hackathon Demo Video Script

## Video Setup & Equipment

- **Duration:** 3-4 minutes
- **Screens:** 3 screens side by side
  - Left: Mobile with Telegram Mini App
  - Center: TonKeeper Wallet
  - Right: TonViewer Explorer
- **Resolution:** 1080p recommended
- **Audio:** Clear voiceover with background music (optional)

---

## 🎬 SCENE 1: Introduction (0:00 - 0:30)

**Screen Focus:** All three screens visible, Mini App prominent

**Script:**

> "Welcome to tgBTC Liquidity Protocol - a revolutionary DeFi solution built on TON blockchain for the hackathon. I'm about to show you how users can provide liquidity, earn rewards, and interact with real smart contracts deployed on TON testnet."

**Screen Actions:**

- Show mini app homepage with $0.00 values (demonstrating real data)
- Briefly flash the other two screens
- Point to "Connect Wallet" button

---

## 🎬 SCENE 2: Wallet Connection (0:30 - 1:00)

**Screen Focus:** Mini App + TonKeeper (split focus)

**Script:**

> "First, let's connect our TonKeeper wallet. Notice how the app integrates seamlessly with Telegram's Web App API and TonConnect protocol."

**Screen Actions:**

1. **Mini App:** Tap "Connect Wallet" button
2. **TonKeeper:** Show connection popup appearing
3. **TonKeeper:** Approve connection
4. **Mini App:** Show wallet info appearing with address
5. **Mini App:** Display debug info showing "Wallet connected = YES"

**Key Points to Mention:**

- "Real wallet integration, not a simulation"
- "Notice the wallet address appears in the app"

---

## 🎬 SCENE 3: Pool Information Loading (1:00 - 1:30)

**Screen Focus:** Mini App prominent, TonViewer secondary

**Script:**

> "Now watch as the app loads real data from our deployed smart contracts. The APY you see is fetched live from the DeDust pool contract."

**Screen Actions:**

1. **Mini App:** Navigate to "Liquidity" tab
2. **Mini App:** Show "Loading pools from chain..." message
3. **Mini App:** Display TON pool with real APY percentage
4. **TonViewer:** Briefly show the DeDust contract address being queried

**Contract Address to Show:**

```
DeDust Pool: EQCCL2mH3OrsHUJk_s01g4S1zSpnISKOjnkZ02FkQqoY6aWx
```

---

## 🎬 SCENE 4: Adding Liquidity - Transaction Preparation (1:30 - 2:15)

**Screen Focus:** Mini App primary

**Script:**

> "Let's add liquidity to earn rewards. I'll deposit 0.5 TON into the DeDust pool. Notice how the transaction summary shows the exact contract address where funds will be sent."

**Screen Actions:**

1. **Mini App:** Select TON pool (show selection highlighting)
2. **Mini App:** Enter amount: "0.5" TON
3. **Mini App:** Show transaction summary with:
   - Pool: Toncoin
   - Amount: 0.5 TON
   - APY: [Real percentage]
   - Contract: EQCCL2mH... (truncated address)
4. **Mini App:** Tap "Add Liquidity" button

**Key Points:**

- "Real transaction being prepared"
- "Contract address visible for transparency"

---

## 🎬 SCENE 5: Transaction Execution (2:15 - 2:45)

**Screen Focus:** TonKeeper prominent, Mini App secondary

**Script:**

> "TonKeeper now prompts for transaction confirmation. This is a real blockchain transaction with actual TON being sent to our deployed smart contract."

**Screen Actions:**

1. **TonKeeper:** Show transaction confirmation popup with:
   - Recipient: EQCCL2mH... (DeDust contract)
   - Amount: 0.5 TON
   - Payload: [Encoded contract call]
2. **TonKeeper:** Tap "Confirm" button
3. **TonKeeper:** Show "Transaction sent" confirmation
4. **Mini App:** Show success message
5. **Mini App:** Show loading spinner with "Sending Transaction..."

**Key Points:**

- "Real TON being transferred"
- "Smart contract interaction, not just UI"

---

## 🎬 SCENE 6: Blockchain Verification (2:45 - 3:30)

**Screen Focus:** TonViewer prominent, other screens supporting

**Script:**

> "Now let's verify this transaction on the blockchain using TonViewer. This proves our contracts are actually deployed and functioning on TON testnet."

**Screen Actions:**

1. **TonKeeper:** Copy transaction hash from confirmation
2. **TonViewer:** Paste transaction hash in search
3. **TonViewer:** Show transaction details:
   - From: [User wallet address]
   - To: EQCCL2mH... (DeDust Pool)
   - Amount: 0.5 TON
   - Success status: ✅
   - Gas used
4. **TonViewer:** Click on contract address
5. **TonViewer:** Show contract information and recent transactions

**Key Points:**

- "Transaction confirmed on blockchain"
- "Contract is live and operational"
- "This is proof of real deployment, not a demo"

---

## 🎬 SCENE 7: Dashboard & Portfolio (3:30 - 4:00)

**Screen Focus:** Mini App prominent

**Script:**

> "Finally, let's check our portfolio dashboard. While it shows zero balance initially, this demonstrates our clean UI that's ready for real user data integration."

**Screen Actions:**

1. **Mini App:** Navigate to "Portfolio" tab
2. **Mini App:** Show dashboard with:
   - Total Portfolio Value: $0.00
   - Total Rewards Earned: $0.00
   - Empty positions state
3. **Mini App:** Show quick action buttons
4. **Mini App:** Display contract integration features

**Key Points:**

- "Clean, professional interface"
- "Ready for mainnet deployment"
- "Built with real user experience in mind"

---

## 🎬 SCENE 8: Closing & Technical Highlights (4:00 - 4:30)

**Screen Focus:** All screens, cycling between key features

**Script:**

> "tgBTC Liquidity Protocol demonstrates the power of TON blockchain with Telegram integration. We've built real smart contracts, seamless wallet connectivity, and a user-friendly interface that's ready for mass adoption."

**Screen Actions:**

1. **Quick montage showing:**
   - Contract addresses in TonViewer
   - Wallet connection flow
   - Transaction confirmation
   - Clean UI design

**Final Points:**

- "Real smart contracts deployed on TON testnet"
- "Full TonConnect integration"
- "Ready for hackathon evaluation"

---

## 📱 Technical Setup Instructions

### Before Recording:

1. **Prepare Wallets:**

   - TonKeeper with testnet TON (at least 1 TON for demo)
   - Note your wallet address for script

2. **Browser Setup:**

   - Open TonViewer in separate browser/tab
   - Have contract addresses ready to paste
   - Clear browser cache for clean demo

3. **Mini App:**
   - Test wallet connection beforehand
   - Ensure dev server is running on HTTPS
   - Verify contract integration is working

### Screen Recording Setup:

```bash
# Start dev server
npm run dev

# Access via HTTPS (required for Telegram Web App)
https://localhost:5173/
```

### Contract Addresses for Reference:

```
DeDust Pool: EQCCL2mH3OrsHUJk_s01g4S1zSpnISKOjnkZ02FkQqoY6aWx
Vault: EQDAu-JP0E5K8Rc7NmyS5auYRb78FKAtFJg3nJ-irs2EYRP7
Megaton Pool: EQB52aT77-AesFVKmM6Wb7iUkBN-rCBILfURFSQwVVsShc
Ston Pool: EQDbezboymmTdBEt0_pO49bZV0kK26ZaBOOiOyekQAXZaeB7
tgBTC Root: EQDLpbQ2sNlYHfBb88iAVqJYgywQpNvlsVkVpxVqor8Yws9T
Jetton Wallet: EQDqUJoFjH6asVbEXL-P_LZ1Ng25K3xWGzpgaHH9RJ-Npnzy
```

---

## 🎯 Key Demo Success Metrics

**What This Demo Proves:**

1. ✅ Real smart contracts deployed on TON
2. ✅ Functional wallet integration
3. ✅ Live blockchain transactions
4. ✅ Professional UI/UX design
5. ✅ Telegram Mini App compliance
6. ✅ TonConnect protocol implementation
7. ✅ On-chain verification capability

**Hackathon Judges Will See:**

- Technical competence with TON blockchain
- Real working product, not just mockups
- Proper integration with TON ecosystem
- User-friendly design suitable for mass adoption
- Transparent, verifiable smart contract deployment

Good luck with your hackathon demo! 🚀
