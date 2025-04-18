import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import matplotlib.patheffects as PathEffects

# Color palette
PRIMARY = '#ED6A5A'
SECONDARY = '#9BC1BC'
ACCENT = '#36C9C6'
BACKGROUND = '#FAF5E6'
TEXT = '#222222'


def draw_intake_survey():
    fig, ax = plt.subplots(figsize=(6, 10))
    ax.set_facecolor(BACKGROUND)
    plt.axis('off')

    # Header
    ax.add_patch(Rectangle((0, 9.5), 6, 0.5, color=PRIMARY, zorder=1))
    ax.text(0.3, 9.7, 'Umovin', fontsize=22, fontweight='bold', color='white', va='center', zorder=2)

    # Progress bar
    ax.add_patch(Rectangle((0.5, 9), 5, 0.25, color=SECONDARY, zorder=1))
    ax.add_patch(Rectangle((0.5, 9), 2, 0.25, color=PRIMARY, zorder=2))
    ax.text(3.5, 9.12, 'Step 1 of 7', fontsize=12, color=TEXT, va='center')

    # Survey questions
    y = 8.5
    ax.text(0.5, y, 'What is your primary fitness goal?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.text(0.7, y, '\u25CB Fat loss    \u25CB Strength    \u25CB Endurance', fontsize=12, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'What is your current fitness level?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.text(0.7, y, '\u25CB Sedentary   \u25CB Beginner   \u25CB Intermediate   \u25CB Advanced', fontsize=12, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'Where will you work out?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.text(0.7, y, '\u25CB Home   \u25CB Gym', fontsize=12, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'What equipment do you have?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.text(0.7, y, '[ ] Dumbbells  [ ] Bands  [ ] None  [ ] Mat  [ ] Other: _______', fontsize=12, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'Preferred workout styles?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.text(0.7, y, '[ ] HIIT  [ ] Yoga  [ ] Strength  [ ] Cardio', fontsize=12, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'How many days per week?   [ 3 ]', fontsize=13, color=TEXT)
    y -= 0.5
    ax.text(0.5, y, 'Preferred workout times:   [ 7:00am - 8:00am ]', fontsize=13, color=TEXT)
    y -= 0.5
    ax.text(0.5, y, 'Target duration per session:   [ 30 ] minutes', fontsize=13, color=TEXT)
    y -= 0.7
    ax.text(0.5, y, 'Any injuries or physical constraints?', fontsize=13, color=TEXT)
    y -= 0.4
    ax.add_patch(Rectangle((0.7, y-0.1), 4, 0.3, color='white', ec=SECONDARY, lw=1, zorder=2))
    y -= 0.6
    # Next button
    ax.add_patch(Rectangle((4, y), 1.3, 0.5, color=ACCENT, zorder=2, ec=PRIMARY, lw=2))
    ax.text(4.65, y+0.25, 'Next →', fontsize=14, color='white', fontweight='bold', va='center', ha='center', zorder=3)

    plt.xlim(0, 6)
    plt.ylim(0, 10)
    plt.savefig('intake-survey.png', bbox_inches='tight', dpi=160)
    plt.close()

def draw_workout_plan_viewer():
    fig, ax = plt.subplots(figsize=(6, 10))
    ax.set_facecolor(BACKGROUND)
    plt.axis('off')
    # Header
    ax.add_patch(Rectangle((0, 9.5), 6, 0.5, color=PRIMARY, zorder=1))
    ax.text(0.3, 9.7, 'Umovin', fontsize=22, fontweight='bold', color='white', va='center', zorder=2)
    # Title
    ax.text(0.5, 9, 'Your Personalized Plan', fontsize=18, color=PRIMARY, fontweight='bold')
    # Plan summary
    y = 8.4
    ax.add_patch(Rectangle((0.5, y-0.15), 5, 0.6, color='white', ec=SECONDARY, lw=1))
    ax.text(0.7, y+0.2, 'Goal: Fat Loss', fontsize=12, color=TEXT)
    ax.text(2.2, y+0.2, 'Level: Beginner', fontsize=12, color=TEXT)
    ax.text(4.0, y+0.2, 'Days: 3/wk', fontsize=12, color=TEXT)
    # Weekly plan table
    y -= 0.6
    ax.text(0.5, y, 'Week 1', fontsize=14, color=ACCENT, fontweight='bold')
    y -= 0.2
    for i, day in enumerate(['Mon', 'Wed', 'Fri']):
        ax.add_patch(Rectangle((0.5, y-0.15-i*0.7), 5, 0.6, color='#fff', ec=SECONDARY, lw=1))
        ax.text(0.7, y+0.2-i*0.7, f'{day}:', fontsize=12, color=TEXT)
        ax.text(1.5, y+0.2-i*0.7, 'HIIT + Strength', fontsize=12, color=PRIMARY)
        ax.text(4.5, y+0.2-i*0.7, '30 min', fontsize=12, color=SECONDARY)
    # Download/Calendar button
    ax.add_patch(Rectangle((3.5, 2.5), 2, 0.7, color=ACCENT, zorder=2, ec=PRIMARY, lw=2))
    ax.text(4.5, 2.85, 'Add to Calendar', fontsize=14, color='white', fontweight='bold', va='center', ha='center', zorder=3)
    plt.xlim(0, 6)
    plt.ylim(0, 10)
    plt.savefig('workout-plan-viewer.png', bbox_inches='tight', dpi=160)
    plt.close()

def draw_calendar_link_interface():
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.set_facecolor(BACKGROUND)
    plt.axis('off')
    # Header
    ax.add_patch(Rectangle((0, 5.5), 6, 0.5, color=PRIMARY, zorder=1))
    ax.text(0.3, 5.7, 'Umovin', fontsize=22, fontweight='bold', color='white', va='center', zorder=2)
    # Title
    ax.text(0.5, 5.2, 'Add Session to Calendar', fontsize=16, color=PRIMARY, fontweight='bold')
    # Calendar link box
    ax.add_patch(Rectangle((0.5, 4.2), 5, 0.8, color='white', ec=SECONDARY, lw=1))
    ax.text(0.7, 4.6, 'Google Calendar Link:', fontsize=12, color=TEXT)
    ax.text(2.1, 4.6, 'https://...', fontsize=12, color=ACCENT)
    # Copy/share buttons
    ax.add_patch(Rectangle((0.7, 3.5), 1.2, 0.5, color=ACCENT, ec=PRIMARY, lw=2))
    ax.text(1.3, 3.75, 'Copy Link', fontsize=12, color='white', va='center', ha='center')
    ax.add_patch(Rectangle((2.1, 3.5), 1.2, 0.5, color=SECONDARY, ec=PRIMARY, lw=2))
    ax.text(2.7, 3.75, 'Share', fontsize=12, color='white', va='center', ha='center')
    # Success message
    ax.text(0.7, 2.8, 'Event link copied! Share with friends.', fontsize=12, color=PRIMARY)
    plt.xlim(0, 6)
    plt.ylim(0, 6)
    plt.savefig('calendar-link-interface.png', bbox_inches='tight', dpi=160)
    plt.close()

if __name__ == '__main__':
    draw_intake_survey()
    draw_workout_plan_viewer()
    draw_calendar_link_interface()
