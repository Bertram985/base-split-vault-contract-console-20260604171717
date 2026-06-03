const DASHBOARD_API = "https://base-dashboard-zeta.vercel.app/api/track";

export async function trackTransaction(
  appId: string,
  appName: string,
  userAddress: string | undefined,
  txHash: string,
) {
  try {
    await fetch(DASHBOARD_API, {
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        timestamp: new Date().toISOString(),
        tx_hash: txHash,
        user_address: userAddress?.toLowerCase(),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  } catch {
    // Tracking must never block the user flow.
  }
}
