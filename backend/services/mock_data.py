from datetime import datetime
from typing import List
from schemas.models import (
    DashboardResponse, KPICard, WeatherResponse, IrradianceResponse, Alert,
    AnalyticsResponse, ArrayComparisonItem, MonthlyDataPoint,
    ReportResponse, ReportRow, ChatResponse, CVUploadResponse, UserProfile
)

class MockDataService:
    @staticmethod
    def get_dashboard_data() -> DashboardResponse:
        kpis = [
            KPICard(title="Energy Generated", value="41.8 kWh", desc="+12.4% from yesterday", trend="up"),
            KPICard(title="Conversion Efficiency", value="94.2 %", desc="Optimal panel temperatures", trend="stable"),
            KPICard(title="Financial Savings", value="₹2,136", desc="Accumulated this week", trend="up"),
            KPICard(title="CO₂ Savings", value="618 kg", desc="Equivalent to 28 trees", trend="up")
        ]
        
        weather = WeatherResponse(
            condition="Clear Sky",
            temperature=28.0,
            uv_index=8,
            wind_speed=12.0,
            cloud_coverage=4
        )
        
        irradiance = IrradianceResponse(
            ghi=842,
            status="OPTIMAL",
            percent=84
        )
        
        alerts = [
            Alert(id=1, device="Inverter #3", msg="Temperature above 72°C (High Load)", severity="critical", time="10m ago"),
            Alert(id=2, device="Panel Grid B4", msg="Soiling accumulation (Efficiency drop)", severity="warning", time="1h ago")
        ]
        
        return DashboardResponse(
            kpis=kpis,
            weather=weather,
            irradiance=irradiance,
            alerts=alerts,
            health_score=98.4
        )

    @staticmethod
    def get_analytics_data() -> AnalyticsResponse:
        comparison = [
            ArrayComparisonItem(name="Array A (Main Roof)", panel_type="Monocrystalline silicon", capacity="6.2 kWp", daily_yield="18.4 kWh", avg_temp="36.8 °C", status="OPTIMAL"),
            ArrayComparisonItem(name="Array B (South Awning)", panel_type="Bifacial solar cells", capacity="4.8 kWp", daily_yield="12.2 kWh", avg_temp="42.1 °C", status="DIRT DETECTED"),
            ArrayComparisonItem(name="Array C (West Garage)", panel_type="Polycrystalline film", capacity="3.5 kWp", daily_yield="8.6 kWh", avg_temp="39.4 °C", status="OPTIMAL"),
            ArrayComparisonItem(name="Array D (Yard Tracker)", panel_type="Dual-axis tracker", capacity="2.4 kWp", daily_yield="2.6 kWh", avg_temp="58.2 °C", status="HOTSPOT DETECTED")
        ]
        
        monthly = [
            MonthlyDataPoint(name="Jan", generation=1450, savings=11600),
            MonthlyDataPoint(name="Feb", generation=1620, savings=12960),
            MonthlyDataPoint(name="Mar", generation=1980, savings=15840),
            MonthlyDataPoint(name="Apr", generation=2400, savings=19200),
            MonthlyDataPoint(name="May", generation=2850, savings=22800),
            MonthlyDataPoint(name="Jun", generation=3100, savings=24800)
        ]
        
        return AnalyticsResponse(
            yield_comparison=comparison,
            monthly_data=monthly
        )

    @staticmethod
    def get_alerts() -> List[Alert]:
        return [
            Alert(id=1, device="Inverter #3", msg="Temperature above 72°C (High Load)", severity="critical", time="10m ago"),
            Alert(id=2, device="Panel Grid B4", msg="Soiling accumulation (Efficiency drop)", severity="warning", time="1h ago"),
            Alert(id=3, device="Grid Interconnect", msg="Frequency stabilization active", severity="info", time="3h ago")
        ]

    @staticmethod
    def generate_report(template: str, scope: str, period: str) -> ReportResponse:
        rows = [
            ReportRow(date="2026-06-06", ghi_index="842 W/m²", solar_yield="41.8 kWh", co2_offsets="618 kg", earnings="₹334.40"),
            ReportRow(date="2026-06-05", ghi_index="790 W/m²", solar_yield="38.4 kWh", co2_offsets="570 kg", earnings="₹307.20"),
            ReportRow(date="2026-06-04", ghi_index="810 W/m²", solar_yield="39.8 kWh", co2_offsets="584 kg", earnings="₹318.40"),
            ReportRow(date="2026-06-03", ghi_index="690 W/m²", solar_yield="32.6 kWh", co2_offsets="480 kg", earnings="₹260.80"),
            ReportRow(date="2026-06-02", ghi_index="740 W/m²", solar_yield="35.2 kWh", co2_offsets="518 kg", earnings="₹281.60")
        ]
        
        file_id = f"rpt_{int(datetime.now().timestamp())}"
        
        return ReportResponse(
            status="SUCCESS",
            file_id=file_id,
            download_url=f"/static/exports/{file_id}.pdf",
            row_count=len(rows),
            data_preview=rows
        )

    @staticmethod
    def process_chat(text: str) -> ChatResponse:
        text_lower = text.lower()
        reply = "I have reviewed your solar logs. The operational yield is currently within normal parameters. Can I assist with further grid adjustments?"
        
        if "roi" in text_lower or "financial" in text_lower:
            reply = "Your cumulative ROI stands at ₹2,136 for this week, trending 12.4% higher than last week due to higher GHI averages (842 W/m²). At this rate, your payback period is projected to complete 4 months ahead of schedule."
        elif "tilt" in text_lower or "optimize" in text_lower:
            reply = "Based on current latitude coordinates, adjusting the tilt angle of Array A from 32° to 28° will optimize GHI absorption, increasing daily clean yield by roughly 4.2 kWh (+₹33.60/day)."
        elif "b4" in text_lower or "dust" in text_lower or "warning" in text_lower:
            reply = "Array B, Panel Row B4 has registered a 14% efficiency drop due to dust/soiling accumulation. I recommend scheduling a washing cycle in the settings panel to restore output back to 320W."
        elif "forecast" in text_lower or "tomorrow" in text_lower:
            reply = "Tomorrow's weather forecast predicts clear skies with a UV index of 9. Solar generation is forecasted at 48.5 kWh, generating an estimated ₹388 in utility savings."
            
        timestamp = datetime.now().strftime("%I:%M %p")
        return ChatResponse(reply=reply, timestamp=timestamp)

    @staticmethod
    def process_cv_upload(filename: str, scan_type: str) -> CVUploadResponse:
        if scan_type == "thermal":
            return CVUploadResponse(
                success=True,
                filename=filename,
                scan_type="thermal",
                risk_score=86,
                severity="critical",
                desc="Severe localized resistance hotspot. Risk of solar junction degradation and eventual bypass diode failure.",
                anomalies=["Hotspot on cell 8 (Row C8)", "High localized resistance (72.8°C)"],
                recommendations=["Replace Bypass Diode PV-300 (C8)", "Audit voltage sweep on Inverter #3", "Dispatch service team to microgrid C8"]
            )
        else:
            return CVUploadResponse(
                success=True,
                filename=filename,
                scan_type="optical",
                risk_score=44,
                severity="warning",
                desc="Dust deposit coating detected on 14% of cell margins. Washing is advised to restore absorption yield.",
                anomalies=["Soot/soiling covering cell rows B1-B6", "Light reflections blocking UV sensors"],
                recommendations=["Trigger high-pressure wash on Grid B4", "Clear bottom array border blockages", "Schedule audit compliance check in 7 days"]
            )
