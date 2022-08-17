import requests
from bs4 import BeautifulSoup
import json
import re

count = 0

page = requests.get('https://www.interviewbit.com/courses/programming/')
soup = BeautifulSoup(page.content, 'html.parser')

topics = soup.find_all(class_='topic-title')
topics_list = []
for i in range(0, len(topics)):
    topics_list.append(
        str.strip(topics[i].get_text()).lower().replace('& ', '').replace(' ', '-'))

final_data = []

for j in range(1, len(topics_list)):
    page = requests.get(
        "https://www.interviewbit.com/courses/programming/" + topics_list[j])
    soup = BeautifulSoup(page.content, 'html.parser')
    list_que = soup.find_all(class_='locked')
    que_list = []
    href_list = []

    list_href = soup.findAll('a', attrs={'href': re.compile("^/problems")})
    for i in range(0, len(list_que)):
        que_list.append(
            str.strip(list_que[i].get_text()).replace('_', '').lower())

    for i in range(0, len(list_href)):
        if 'class="locked problem_title"' in str(list_href[i]):
            href_list.append(list_href[i].get('href'))
            count += 1

    for i in range(0, len(que_list)):
        url = "https://www.interviewbit.com/old"+href_list[i]
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')

        companyHTML = soup.find(
            class_="companies-asked-in")
        companies = []
        try:
            for c in companyHTML.find_all("span"):
                companies.append(c.get_text())
        except:
            print("Company exception")

        description = soup.find(class_='markdown-content')
        try:
            description.find("blockquote").decompose()
        except:
            print("Block quote exception")

        statement = description.find(
            id="problem_description_markdown_content_value")
        if statement is None:
            continue
        statement = statement.get_text().replace(
            "\n", "").replace("\u00a0", "").replace(".", ". ")
        description = str(description)
        title = soup.find(class_='panel-title').get_text()

        topic = topics[j].get_text()

        textSoup = BeautifulSoup(page.text, 'html.parser')
        all_scripts = textSoup.find_all('script')
        difficulties = ["very_easy", "easy", "medium", "hard"]
        difficulty = ""
        for number, script in enumerate(all_scripts):
            for diff in difficulties:
                if diff in script.text:
                    if diff == "very_easy":
                        difficulty = "Easy"
                    else:
                        difficulty = diff.capitalize()

        link = title.lower().replace(" ", "-")

        data = {"title": title, "topic": topic,
                "companies": companies, "difficulty": difficulty, "description": description, "statement": statement, "link": link}
        final_data.append(data)

with open('main.json', 'w') as jsonfile:
    json.dump(final_data, jsonfile)
